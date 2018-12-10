var app = document.getElementById('anchor');
var btn = document.getElementById('btn');
var patches;
var tree = h('div',{class:'main', id:'body'},[
       h('div',{class:'sideBar'},[
          h('ul',{class:'sideBarContainer',cprop:1},[
               h('li',{class:'sideBarItem'},['page1']),
               h('li',{class:'sideBarItem'},['page2']),
               h('li',{class:'sideBarItem'},['page3']),
            ])
        ]),
       h('div',{class:'mainContent'},[
           h('div',{class:'header'},['header zone']),
           h('div',{class:'coreContent'},[
                 h('div',{fx:1},['flex1']),
                 h('div',{fx:2},['flex2'])
            ]),
           h('div',{class:'footer'},['footer zone']),
        ])
    ]);
var newtree = h('div',{class:'main', id:'body'},[
       h('div',{class:'sideBar'},[
          h('ul',{class:'sideBarContainer',cprop:1, ap:'test'},[
               h('li',{class:'sideBarItem',bp:'test'},['page4']),
               h('li',{class:'sideBarItem'},['page5']),
               h('div',{class:'sideBaritem'},['FromLiToDiv'])
            ])
        ]),
       h('div',{class:'mainContent'},[
           h('div',{class:'header'},['header zone']),
           h('div',{class:'coreContent'},[
                 h('div',{fx:3},['flex1']),
                 h('div',{fx:2},['flex2'])
            ]),
           h('div',{class:'footer'},['footer zone']),
        ])
    ]);

//生成离线DOM
let realDOM = tree.render();
//挂载DOM
app.appendChild(realDOM);
//按钮触发虚拟DOM变更
btn.addEventListener('click',changeVD);

//点击触发构建一棵新树
function changeVD() {
   //获得补丁
   patches = domdiff(tree, newtree);
   //更新DOM
   addPatch(tree, patches);
}
