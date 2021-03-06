from flask import Blueprint,request,jsonify

from application import app,db
import os,datetime,stat,uuid,json,re
router_upload = Blueprint('upload_page',__name__)

@router_upload.route('/ueditor',methods=['GET','POST'])
def ueditor():
    #加载UEditor json配置
    req = request.values
    action = req['action'] if 'action' in req else ''
    if action == 'config':
        root_path = app.root_path
        config_path = '{0}\\web\\static\\plugins\\ueditor\\upload_config.json'.format(root_path)
        with open(config_path) as fp:
            try:
                conf_data = json.loads(re.sub(r'\/\*.*\*/','',fp.read()))
            except:
                conf_data = {}
        return jsonify(conf_data)
    return 'ueditor'


@router_upload.route('/pic',methods=['GET','POST'])
def uploadPic():
    resp = {
        'code':200,
        'msg':'操作成功',
        'data':{}
    }
    pic = request.files['pic']
    print(pic)
    print(app.root_path)
    root_path = app.root_path + app.config['UPLOAD']['prefix_path']
    file_dir = datetime.datetime.now().strftime('%Y%m%d')
    save_dir = root_path + '\\' + file_dir
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
        os.chmod(save_dir,stat.S_IRWXU | stat.S_IRGRP | stat.S_IRWXO)
    pic_name = str(uuid.uuid4()).replace('-','')+'.'+pic.filename
    pic.save('{0}\\{1}'.format(save_dir,pic.filename))
    return jsonify(resp)