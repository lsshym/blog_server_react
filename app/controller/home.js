'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const result = await app.mysql.get('article');
    ctx.body = result;
  }
  async list() {
    const { ctx } = this;

    const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.addTime as addTime,' +
            'article.view_count as view_count,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id';
    const results = await this.app.mysql.query(sql);

    ctx.body = {
      data: results,
    };
  }
  async getArticleById(){
    //先配置路由的动态传值，然后再接收值
    const { ctx } = this;

    let id = ctx.params.id

    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.content as article_content,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id

    const result = await this.app.mysql.query(sql)

    this.ctx.body={data:result}

}
}

module.exports = HomeController;
