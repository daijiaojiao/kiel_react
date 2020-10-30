import React from 'react';
import { Tree, Checkbox } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import store from '../../../store/index';


let {category,config} = store.getState();
function formatData(data){
    let newData = [];
    for(let i=0,len = data[0].length;i<len;i++){
        let path = data[0][i].path,
            children = [];
        if(data[path]&&data[path].length>0){
            for(let j = 0;j<data[path].length;j++ ){
                children[j] = {...data[path][j], key: data[path][j].cid,children:[],title:data[path][j].name};
            }
        }
        newData[i] = {...data[0][i],key:data[0][i].cid,children,title:data[0][i].name}; 
    }
    return newData;
}
function formatExtType(data){
    let newData = {};
    for(let key in data){
        let item = [];
        for(let i = 0,len = config[key].length; i<len; i++){
            item[i] = {
                label: config[key][i].value,
                value: config[key][i].key,
                id: config[key][i].id
            }
        }
        newData[key] = item;
    }
    return newData;
}
function LeftChooseIP(props){
    let ext = formatExtType(props.extTypeMap);
    let extTitle = props.mcid==='2'?{
        ip_type:'IP分类',
        ip_foundry:'代工厂',
        ip_com_cate:'商用类别',
        ip_open_cate: '开源类别',
        ip_technics:'工艺'
    }:{
        common_type: '类别',
        file_format: '文件格式',
        ic_flow: '领域',
        ic_semi_type: [],
        ic_type: [],
        lang: '语言'
    };
    function canShowOption(item){
        if(props.mcid==='2'){
            if(props.extTypeMap['ip_type'].includes('com')&&item==='ip_com_cate'){
                return true;
            }
            if(props.extTypeMap['ip_type'].includes('open')&&item==='ip_open_cate'){
                return true;
            }
            if(item!=='ip_open_cate'&&item!=='ip_com_cate'){
                return true;
            }
            return false;
        }else{
            if(item==='ic_semi_type'||item==='ic_type'){
                return false;
            }
            return true
        }
        
    }
    return(
        <div className="left-choose">
            {Object.keys(ext).map((item,index)=>
                <React.Fragment key={item}>
                    {canShowOption(item)?
                        (
                            <>
                                <div className="choose-title">{extTitle[item]}</div>
                                <Checkbox.Group options={ext[item]}  onChange={props.onChange.bind(this,item)} />
                            </>
                        ):
                        ''
                    }
                </React.Fragment>
            )}
        </div>
    )
    
}

function LeftChoose (props){
    if(props.mcid ==='2'||props.mcid ==='1'){
        return (
            <LeftChooseIP {...props}/>
        )
    }else if(props.mcid ==='3'){
        const treeData = formatData(category);
        return (
            <>
            <Tree className="left-choose"
                switcherIcon={<DownOutlined />}     
                onSelect={props.onSelect}
                treeData={treeData}
            ></Tree>
            </>
        )
    }
    
    
}

export default LeftChoose;