const { readFile } = require('fs').promises;
const { createWriteStream } = require('fs');
const axios = require('axios');

const express = require('express');
const router = express.Router({ mergeParams: true });
const FILE_PATH = './public/pastQueries.log';

const log = createWriteStream(FILE_PATH, { flags: 'a', start: 0 });

function responseFormater(clientResponse) {
  const urlDic = new Map();
  function getUrlAndTitle(arr) {
    if (arr.length === 0) return;
    const innerArr = [];
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (!element.FirstURL) {
        innerArr.push(...element.Topics);
      } else {
        urlDic.set(element.FirstURL, {
          title: element.Result.split('</a>')[0].split('">')[1],
        });
      }
    }
    getUrlAndTitle(innerArr);
  }
  getUrlAndTitle(clientResponse.data.RelatedTopics);
  return Array.from(urlDic, ([url, value]) => ({ url, title: value.title }));
}

router
  .get('/getList', async (req, res) => {
    const { q } = req.query;
    let axiosResponse;
    let errors = [];
    try {
      axiosResponse = await axios({
        method: 'get',
        url: 'http://api.duckduckgo.com',
        params: { q, format: 'json' },
      });
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          errors = [{ errMsg: Object.values(error.response.data.errors).toString() }];
        } else {
          errors = [{ errMsg: error.toJSON().message }];
        }
      } else if (error.request) {
        errors = [{ errMsg: 'Target Server Is Unavailable' }];
      } else {
        errors = [{ errMsg: 'Server Error' }];
      }
    }
    const clientResponse = { data: axiosResponse ? axiosResponse.data : [], errors };
    const formatedClientResponse = responseFormater(clientResponse);
    res.status(200).json(formatedClientResponse);
  })
  .get('/getPersistList', async (req, res, next) => {
    readFile(FILE_PATH, 'utf8')
      .then((contents) => {
        res.status(200).json([contents]);
      })
      .catch((err) => {
        const error = new Error('The file is not exist');
        error.status = 404;
        next(error);
      });
  })
  .post('/persist', async (req, res) => {
    const { q } = req.body;
    if (!q) {
      res.status(404).json([]);
      return;
    }
    let axiosResponse;
    let errors = [];
    try {
      axiosResponse = await axios({
        method: 'get',
        url: 'http://api.duckduckgo.com',
        params: { q, format: 'json' },
      });
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          errors = [{ errMsg: Object.values(error.response.data.errors).toString() }];
        } else {
          errors = [{ errMsg: error.toJSON().message }];
        }
      } else if (error.request) {
        errors = [{ errMsg: 'Target Server Is Unavailable' }];
      } else {
        errors = [{ errMsg: 'Server Error' }];
      }
    }
    if (!axiosResponse.data) {
      res.status(404).json([]);
      return;
    }
    log.write(`${q}*@*`);
    const clientResponse = { data: axiosResponse ? axiosResponse.data : [], errors };
    const formatedClientResponse = responseFormater(clientResponse);
    res.status(200).json(formatedClientResponse);
  });

module.exports = router;
