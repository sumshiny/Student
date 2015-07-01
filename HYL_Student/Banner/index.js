
//1：数据定义(实际生产环境中，应有后台给出)
var data=[
	{img:1,h1:'寄情山水',h2:'山水之下必有龙'},
	{img:2,h1:'神话传说',h2:'传说之内心花路'},
	{img:3,h1:'美女传说',h2:'神龙见首不见尾'},
	{img:4,h1:'寄情山水',h2:'山水之下必有龙'},
	{img:5,h1:'神话传说',h2:'传说之内心花路'},
	{img:6,h1:'美女传说',h2:'神龙见首不见尾'}
];

//2.通用函数
var g=function(id){
	if(id.substr(0,1)=='.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
};

//3.添加幻灯片的操作(所有的幻灯片&对应的按钮)
function addSliders(){
	//3.1获取模板
	var tpl_main=g('template_main').innerHTML
					.replace(/^\s*/,'')
					.replace(/\s*/,'');
	var tpl_ctrl=g('template_ctrl').innerHTML
					.replace(/^\s*/,'')
					.replace(/\s*/,'');
	//3.2定义最终输出HTML的变量
	var out_main=[];
	var out_ctrl=[];

	//3.3 遍历所有数据，构造最终输出的HTML
	for(i in data){
		var _html_mian=tpl_main.replace(/{{index}}/g,data[i].img)
						.replace(/{{h2}}/g,data[i].h1)
						.replace(/{{h3}}/g,data[i].h2);
		var _html_ctrl=tpl_ctrl.replace(/{{index}}/g,data[i].img);

		out_main.push(_html_mian);
		out_ctrl.push(_html_ctrl);
	}

	//3.4 把所有的HTML回写到对应的DOM里面
	g('template_main').innerHTML=out_main.join('');
	g('template_ctrl').innerHTML=out_ctrl.join('');

	//7.增加#main_background
	g("template_main").innerHTML+=tpl_main.replace(/{{index}}/g,'{{index}}')
						.replace(/{{h2}}/g,data[i].h1)
						.replace(/{{h3}}/g,data[i].h2);
	g('main_{{index}}').id='main_background';
}

//4.定义何时处理幻灯片输出
window.onload=function(){
	addSliders();
	switchSlider(1);
	setTimeout(function(){
		movePictures()
	},100);
}

//5.幻灯片切换
function switchSlider(n){
	//5.1获得要展示的幻灯片&控制按钮 DOM
	var main=g('main_'+n);
	var ctrl=g('ctrl_'+n);

	//5.2获得所有的幻灯片以及控制按钮
	var clear_main=g('.main-i');
	var clear_ctrl=g('.ctrl-i');

	//5.3清除active样式
	for(i=0;i<clear_ctrl.length;i++){
		clear_main[i].className=clear_main[i].className
			.replace(' main-i_active','');
		clear_ctrl[i].className=clear_ctrl[i].className
			.replace(' ctrl-i_active','');
	}

	//5.4 为当前控制按钮和幻灯片附加样式
	main.className+=' main-i_active';
	ctrl.className+=' ctrl-i_active';

	//8.切换时，复制上一张幻灯片到main_background中
	setTimeout(function(){
		g('main_background').innerHTML=main.innerHTML;
	},1000);
	
}

//6.动态调整图片的margin-top 已使其垂直居中
function movePictures(){
	var pictures=g('.picture');
	for(i=0;i<pictures.length;i++){
		pictures[i].style.marginTop=(-1*pictures[i].clientHeight/2)+'px';
	}
}