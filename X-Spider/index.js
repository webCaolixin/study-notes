const fs = require('fs');
const path =require('path');
const request =require('request');
const cheerio =require('cheerio');
const colors = require('colors');
const async = require('async');
const Nightmare = require('nightmare');           // 处理动态页面
const nightmare = Nightmare({ show: true });


/**
 * 测试站点  如jandan.net/ooxx/page-1000
 */
let urltxt = 'http://jandan.net/ooxx/page-',
    startpage = 1,      // 起始页
    endpage,            // 结束页
    picdir,             // 保存图片的目录
    creatdir;           // 保存图片的目录相对于项目根目录的路径

/**
 * 第一次请求获取页面总页数
 */
var options = {
  url: 'http://jandan.net/ooxx/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
    'Connection':'keep-alive'
  }
};
request(options, (err, response, body) => {
  if (err) {
    console.log(`首次请求获取页面总页数失败- ${err}`.red)
  } else {
    let $ = cheerio.load(body);
    endpage = $('div.comments .current-comment-page').eq(0).text().replace(/\[/, '').replace(/\]/, '');

    picdir = 'images' + '_' +startpage + '_' + endpage +'/';        // 保存图片的目录名称
    creatdir = './' +picdir;              // 保存图片的目录相对项目根目录的路径

    creatDir(creatdir)
  }
})


/**
 * 创建 图片保存目录
 */
let creatDir = (creatdir) => {
  if (!fs.existsSync(creatdir)) {
    fs.mkdirSync(creatdir, function(err) {
      if (err) {console.log(`${err}`.red)};
      console.log('目录- ' + creatdir +' -创建成功'.cyan);
    });
  }
  let urls = getUrls()
  getPages(urls)
}


/**
 *  生成所有要访问的页面的url
 */
let getUrls = () => {
  let requrl = []
  for (let i = startpage; i <= endpage; i++) {
    requrl.push(urltxt + i);
  };
  return requrl
}


/**
 * 异步逐一请求目标页面
 * 注:大量并发请求目标网站有可能触发反爬虫机制
 * 也有肯能被查封ip
 */
let getPages = (urls) => {
  async.eachSeries(urls, (url, callback) => {
    console.log(`开始请求- ${url} -页面`.cyan)
    nightmare
    .goto(url)
    .wait("ol.commentlist")
    .evaluate(() => document.querySelector("ol.commentlist").innerHTML)
    .then(ol => {
      analysisData(ol, callback)
      // callback()
    })
    .catch(error => {
      console.error(`${url} -页面内容获取失败- ${error}`.red)
    })
  })
}


/**
 * 爬取页面中目标数据 img的src属性
 */
function analysisData(olInnerHTML, pagCallback) {
  let $ = cheerio.load(olInnerHTML);
  let pics = $("div.text p img").toArray();//将所有的img放到一个数组中

  console.log(`当前页共抓取图片 ${pics.length} 张`.yellow);
  console.time("----创建当前页图片下载任务计时----");

  async.eachSeries(pics, (pic, callback) => {
    let pics_src = $(pic).attr('src');
    let filename = parseUrlForFileName(pics_src); //生成文件名

    if (pics_src.indexOf('http:') === -1) {
      pics_src = `http://${pics_src}`
    }

    downloadImg(pics_src, filename, callback);
  }, (err, result) => {
    if (err) {
      console.log(`${err}`.red)
    } else {
      console.log('当前页面所有图片保存完成！')
      pagCallback()
    }
  })

  console.timeEnd("----创建当前页图片下载任务计时----");
}


//图片命名
function  parseUrlForFileName(address) {
    let filename = path.basename(address);
    return filename;
}


// --------------------------------------
// 下载保存
// NodeJs path API http://nodejs.org/api/path.html#path_path_basename_p_ext
// request.head==》》fs模块createWriteStream写入到指定目录
// 爬取资源较大时 用async来限制一下异步的并发，由于node并发连接数太多可能会被和谐
// --------------------------------------
let downloadImg = function(uri, filename, imgCallback) {
  console.log(`开始请求图片:${uri}`.cyan);

  request({url: uri, encoding: 'binary'}, (error, response, body) => {
    if (error) {
      console.log(`${error}`.red)
    } else {
      fs.writeFile(picdir + filename, body, 'binary', (err) => {
        if (err) {
          console.log(`当前图片保存出错-- ${err}`)
        } else {
          console.log('当前图片保存成功！！')
          imgCallback()
        }
      })
    }
  })
};
