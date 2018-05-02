//三个参数分别是数据源，数据格式和将要append的table或者tbody的id
function billyTableRender(dataSource,dataForm,elementID) {
	var tableNode = document.getElementById(elementID)
	//清空table
	tableNode.innerHTML=""
	var tempTable, tempTr,tempTd,tempAttr
	for (var i=0;i<dataSource.length;i++){
		tempTr = document.createElement('tr')
		for(var k=0;k<dataForm.length;k++){
			//如果是string，代表仅仅是对字段而已
			if(typeof dataForm[k]=='string'){
				tempTd = document.createElement('td')
				tempTd.innerHTML=dataSource[i][dataForm[k]]
				tempTr.appendChild(tempTd)
			//如果是对象的话，则需要详细的动态添加元素
			}else{
				tempTd = document.createElement('td')
				tempObj = document.createElement(dataForm[k]['tag'])
				for(var j in dataForm[k]){
					if(j == "tag"){
						
					}else if(j == "innerHTML"){
						//给td定义innerHTML
						tempObj.innerHTML=dataSource[i][dataForm[k][j]]
					}else if(j == 'innerText'){
						//给td定义innerText
						tempObj.innerText=dataSource[i][dataForm[k][j]]
					}else if(j != "tag" && j != "innerText" && j != "innerHTML" && j != "selfDefined"&&j != "style"){
						//根据dataForm元素中对象里的值所对应的dataSource里的字段来为新创建的DOM对象赋以属性
						tempObj.setAttribute(j,dataSource[i][dataForm[k][j]])
					}else if(j == "selfDefined"){
						//如果写在selfDefined里面，就直接根据dataForm里的值来定义属性 
						tempAttr=dataForm[k][j]
						for (var l in tempAttr){
							tempObj.setAttribute(l,tempAttr[l])
						}
					}else if(j == "style"){
						//如果写在style里面，则为DOM对象定义style属性，也是根据value从dataSource里索引出来的
						tempAttr=dataForm[k][j]
						for (var l in tempAttr){
							tempObj.style[l]=dataSource[i][tempAttr[l]]
						}
					}
				}
				tempTd.appendChild(tempObj)
				tempTr.appendChild(tempTd)
			}
		}
		tableNode.appendChild(tempTr)
	}
}
