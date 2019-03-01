"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const taro_1 = require("@tarojs/taro");
const components_1 = require("@tarojs/components");
const redux_1 = require("@tarojs/redux");
const board_png_1 = require("../../images/board.png");
const plus_png_1 = require("../../images/plus.png");
const counter_1 = require("../../actions/counter");
const taro_ui_1 = require("taro-ui");
require("./index.scss");
// import  'prop-types';
// import { any, array } from 'prop-types';
// #region 书写注意
// 
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion
wx.cloud.init({
    env: 'test-13e9863'
});
const app = taro_1.default.getApp();
// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
let Index = class Index extends taro_1.Component {
    // @connect(({ counter }) => ({
    //   counter
    // }), (dispatch) => ({
    //   add () {
    //     dispatch(add())
    //   },
    //   dec () {
    //     dispatch(minus())
    //   },
    //   asyncAdd () {
    //     dispatch(asyncAdd())
    //   }
    // }))
    constructor() {
        super(...arguments);
        /**
       * 指定config的类型声明为: Taro.Config
       *
       * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
       * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
       * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
       */
        this.config = {
            navigationBarTitleText: 'Dice'
        };
        this.state = {
            isOpened1: false,
            //boolset数组储存一些布尔变量值
            //0:确定是否作弊的指标
            boolset: [false],
            test: 0,
            //这是下拉栏
            list: [
                {
                    id: 'view',
                    name: '视图容器',
                    open: true,
                    pages: ['zuobikaiqi'] //, 'scroll-view', 'swiper']
                }
            ],
            //角色卡对象
            ability_sheet: [
                {
                    id: 0,
                    name: '简易DND',
                    grid_type: 'three',
                    ability: [
                        {
                            id: 1,
                            name: 'HP',
                            value: 25
                        },
                        {
                            id: 2,
                            name: 'AC',
                            value: 12
                        },
                        {
                            id: 3,
                            name: '=',
                            value: ''
                        },
                        {
                            id: 4,
                            name: 'fort',
                            value: 10
                        },
                        {
                            id: 5,
                            name: 'refl',
                            value: 12
                        },
                        {
                            id: 6,
                            name: 'will',
                            value: 10
                        }
                    ]
                }
            ],
            //数字和等式
            num: 0,
            equation: 0,
            //输入框预设
            input: '',
            todos: [
                {
                    name: 'd20',
                    completed: false
                },
                {
                    name: 'd100',
                    completed: false
                }
            ],
            leftCount: 1,
            allCompleted: false,
            logs: [{
                    timestamp: new Date().toJSON(),
                    action: '初始化',
                    name: 'init'
                }],
            tmp: [],
            //
            showModalStatus: false,
            //前置提醒信息
            showinfo: ''
        };
        this.save = () => {
            taro_1.default.setStorageSync('diceset_list', this.state.todos);
            taro_1.default.setStorageSync('diceset_logs', this.state.logs);
            // console.log(
            //   '[页面事件] [save] 骰组（list）:',
            //   this.state.todos.length,
            //   '条，记录（log）',
            //   this.state.logs.length,
            //   '条'
            // )
            taro_1.default.setStorageSync('ability_sheet', this.state.ability_sheet);
        };
        this.load = () => {
            var todos = taro_1.default.getStorageSync('diceset_list');
            if (todos) {
                var leftCount = todos.filter(function (item) {
                    return !item.completed;
                }).length;
                this.setState({
                    todos: todos,
                    leftCount: leftCount
                });
            }
            var logs = taro_1.default.getStorageSync('diceset_logs');
            if (logs) {
                this.setState({
                    logs: logs
                });
            }
            console.log('[页面事件] [load] 骰组（list） : ', this.state.todos.length, '条 记录（log）', this.state.logs.length);
            var ability_sheet = taro_1.default.getStorageSync('ability_sheet');
        };
        this.onShareAppMessage = res => {
            if (res.from === 'menu') {
                // 来自菜单转发按钮
                console.log(res.target);
            }
            else {
                // 来自qita转发按钮
                console.log(res.target);
            }
            return {
                title: '跑团掷骰工具',
                path: '/pages/index/index?id=123',
                success: function (res) {
                    // 转发成功
                    console.log('[页面事件] [onShareAppMessage] shareTickets : ', res.shareTickets[0]);
                },
                fail: function (res) {
                    // 转发失败
                    console.log('[页面事件] [onShareAppMessage] err : ', res);
                }
            };
        };
        this.inputChangeHandle = e => {
            this.setState({
                input: e.detail.value
            });
        };
        this.addTodoHandle = e => {
            if (!this.state.input || !this.state.input.trim())
                return;
            var todos = this.state.todos;
            todos.push({
                name: this.state.input,
                completed: false
            });
            var logs = this.state.logs;
            logs.push({
                timestamp: new Date().toJSON(),
                action: '新增',
                name: this.state.input
            });
            this.setState({
                input: '',
                todos: todos,
                leftCount: this.state.leftCount + 1,
                logs: logs
            });
            this.save();
        };
        //=============
        this.toggleTodoHandle = e => {
            //var name =  todos[index].name
            var index = e.currentTarget.dataset.index;
            var todos = this.state.todos;
            todos[index].completed = !todos[index].completed;
            var logs = this.state.logs;
            this.state.equation = 2;
            //todos[index].name = todos[index].name
            var roll = this.roll(todos[index].name);
            var r = '';
            if (roll) {
                for (var i = 0; i < roll.res.length; i++) {
                    if (r == '') {
                        r = roll.res[i];
                    }
                    else {
                        r = r + '+' + roll.res[i];
                    }
                }
                //todos
                r = r + '=';
                // if (this.state.logs[logs.length - 1].name == "投掷4d3"){
                //   var tmp1=true
                //   //this.state.list[0].pages[0] = "true"
                // } else { var tmp1 = false}
                // var tmp2
                // tmp2 = this.state.list[0].pages[0]
                this.state.boolset[0] = this.state.logs[logs.length - 1].name == '投掷4d3';
                //这里是一个作弊代码
                //r = this.state.boolset[0]+ ")("+ this.state.logs[logs.length-1].name + " " +r
                logs.push({
                    timestamp: new Date().toJSON(),
                    action: '结果' + roll.total,
                    name: '投掷' + todos[index].name
                });
                this.setState({
                    tmp: [],
                    equation: r,
                    num: roll.total,
                    todos: todos,
                    leftCount: this.state.leftCount + (todos[index].completed ? -1 : 1),
                    logs: logs
                });
                this.save();
            }
        };
        this.removeTodoHandle = e => {
            var index = e.currentTarget.dataset.index;
            var todos = this.state.todos;
            var remove = todos.splice(index, 1)[0];
            var logs = this.state.logs;
            logs.push({
                timestamp: new Date().toJSON(),
                action: '移除',
                name: remove.name
            });
            this.setState({
                todos: todos,
                leftCount: this.state.leftCount - (remove.completed ? 0 : 1),
                logs: logs
            });
            this.save();
        };
        this.roll = (dice) => {
            dice = dice.replace(/- */, '+ -');
            dice = dice.replace(/D/, 'd');
            var re = / *\+ */;
            var items = dice.split(re);
            let res = [];
            var type = [];
            var total = 0;
            for (var i = 0; i < items.length; i++) {
                var match = items[i].match(/^[ \t]*(-)?(\d+)?(?:(d)(\d+))?[ \t]*$/);
                if (match) {
                    var originres;
                    var cheatres;
                    var sign = match[1] ? -1 : 1;
                    var num = parseInt(match[2] || '1', 10);
                    var max = parseInt(match[4] || '0', 10);
                    if (match[3]) {
                        for (var j = 1; j <= num; j++) {
                            originres = Math.ceil(max * Math.random());
                            cheatres = max / 2 + Math.abs(max / 2 - originres);
                            //todos
                            if (this.state.boolset[0]) {
                                res[res.length] = sign * cheatres;
                                this.state.list[0].pages[0] = 'true';
                            }
                            else {
                                res[res.length] = sign * originres;
                                this.state.list[0].pages[0] = 'false';
                            }
                            type[type.length] = max;
                        }
                    }
                    else {
                        res[res.length] = sign * num;
                        type[type.length] = 0;
                    }
                }
                else
                    return null;
            }
            for (var j = 0; j < res.length; j++) {
                total = total + res[j];
            }
            if (res.length === 0)
                return null;
            return {
                res: res,
                type: type,
                total: total
            };
        };
        this.rollDice = (dice) => {
            if (!dice)
                return;
            var data = this.roll(dice);
            if (data) {
                var str = '';
                var total = 0;
                for (var i = 0; i < data.res.length; i++) {
                    total = total + data.res[i];
                    if (data.res.length > 0) {
                        var special = '';
                        if (i)
                            str = str + (data.res[i] >= 0 ? ' + ' : ' - ');
                        if (data.type[i]) {
                            str = str + "<span class='type'>d" + data.type[i] + '</span>';
                            if (data.type[i] == data.res[i])
                                special = 'crit';
                            if (data.res[i] == 1)
                                special = 'fum';
                        }
                        str =
                            str +
                                "<span class='roll " +
                                special +
                                "'>" +
                                Math.abs(data.res[i]) +
                                '</span>';
                    }
                }
                var strarr = [str];
                //str=""
                str = str + " = <span class='total'>" + total + '</span>';
                //strarr.append(str)
                return strarr[2];
            }
            else {
                return 'Error in roll formula';
            }
        };
        this.kindToggle = e => {
            var test = this.state.test + 1;
            var id = e.currentTarget.id, list = this.state.list;
            for (var i = 0, len = list.length; i < len; ++i) {
                if (list[i].id == id) {
                    list[i].open = !list[i].open;
                }
                else {
                    list[i].open = false; //点击其他栏，则关闭之前打开的
                }
            }
            this.setState({
                list: list,
                test: test
            });
        };
        this.inputChangeStat = e => {
            console.log('[页面事件] [inputChangeStat] 目标 : ', this.state.ability_sheet[e.currentTarget.dataset.value.id].ability[e.currentTarget.dataset.id].name);
            this.state.ability_sheet[e.currentTarget.dataset.value.id].ability[e.currentTarget.dataset.id].value = e.detail.value;
            this.setState({
                ability_sheet: this.state.ability_sheet
            });
        };
        this.addStatHandle = e => {
            console.log('[页面事件] [addStatHandle] 改变 : ', this.state.ability_sheet[e.currentTarget.dataset.value.id].ability[e.currentTarget.dataset.id].value);
            var logs = this.state.logs;
            logs.push({
                timestamp: new Date().toJSON(),
                action: '改为' +
                    this.state.ability_sheet[e.currentTarget.dataset.value.id].ability[e.currentTarget.dataset.id].value,
                name: this.state.ability_sheet[e.currentTarget.dataset.value.id].ability[e.currentTarget.dataset.id].name
            });
            this.setState({
                input: '',
                leftCount: this.state.leftCount + 1,
                logs: logs
            });
            this.save();
        };
        //==============
        this.handleClick = type => {
            this.setState({
                [`isOpened${type}`]: true
            });
        };
        this.handleClose = type => {
            console.log('handleClose');
            this.setState({
                [`isOpened${type}`]: false
            });
        };
        // render () {
        //   return (
        //     <View className='index'>
        //       <Button className='add_btn' onClick={this.props.add}>+</Button>
        //       <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        //       <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        //       <View><Text>{this.props.counter.num}</Text></View>
        //       <View><Text>Hello, World</Text></View>
        //     </View>
        //   )
        // }
    }
    componentWillMount() {
        console.log('[页面事件] [load]');
    }
    // componentWillUnmount(options) {}
    // componentWillMount(options) {
    //   this.state.showinfo = this.shareTicket
    //   console.log('st' + this.shareTicket)
    //   if (this.ShareTicket) {
    //     console.log('[页面事件] [onLaunch] ShareTicket : ', this.ShareTicket)
    //   } else {
    //     console.log('[页面事件] [onLaunch] 未获取 ShareTicket ')
    //   }
    // }
    componentDidShow() {
        // console.log('[页面事件] [onShow] wxTimer1 : ', wxTimer1)
        // this.opengid = this.ShareTicket
        // if (this.ShareTicket) {
        //   console.log('[页面事件] [onShow] ShareTicket : ', this.ShareTicket)
        // } else {
        //   // console.log('[页面事件] [onShow] 未获取 ShareTicket ')
        // }
        console.log('[页面事件] [onShow] ability_sheet : ', this.state.ability_sheet);
        this.state.ability_sheet = this.props.sheet;
        this.setState({
            ability_sheet: this.state.ability_sheet
        });
        this.save();
    }
    //====
    componentWillReceiveProps(nextProps) {
        console.log(this.props, nextProps);
    }
    componentDidHide() { }
    // onInput = e => {
    //   this.setState({
    //     value: e.detail.value
    //   })
    // }
    render() {
        const { isOpened1, 
        // txt: txt,
        // isShow: isShow,
        // _value: _value,
        showModalStatus: showModalStatus, 
        // animationData: animationData,
        // sheetname: sheetname,
        showinfo: showinfo, equation: equation, num: num, list: list, input: input, todos: todos, ability_sheet: ability_sheet } = this.state;
        return (<components_1.Block>
        
        {showinfo}
        <components_1.View className="container">
          <components_1.View className="widget-head">
            
            result holder
          </components_1.View>
          
          <components_1.View className="result">
            <components_1.Text className="equation">{equation}</components_1.Text>
            <components_1.Text className="num">{num}</components_1.Text>
          </components_1.View>
          {list.map((item, index) => {
            return (<components_1.Block key={item.id}>
                <components_1.View className="kind-list-item">
                  <components_1.View className="header">
                    <components_1.Image className="plus" src={plus_png_1.default}/>
                    <components_1.Input className="new-todo" value={input} placeholder="比如5d6+11" autoFocus onInput={this.inputChangeHandle} onConfirm={this.addTodoHandle}/>
                    
                    <components_1.Image src={board_png_1.default} id={item.id} className={'board ' + (item.open ? '' : '')} onClick={this.kindToggle}/>
                    
                  </components_1.View>
                  
                </components_1.View>
              </components_1.Block>);
        })}
          {todos.length ? (<components_1.Block>
              <components_1.View className="todos">
                
                
                {todos.map((item, index) => {
            return (<components_1.View className={'item' + (item.completed ? ' completed' : '')} key={index} onClick={this.toggleTodoHandle} data-index={index}>
                      
                      
                      <components_1.Text className="name">{item.name}</components_1.Text>
                      <components_1.Icon className="remove" type="clear" size="16" onClick={this.removeTodoHandle} data-index={index}/>
                    </components_1.View>);
        })}
              </components_1.View>
              
            </components_1.Block>) : (<components_1.Block>
              <components_1.View className="dice-empty">
                <components_1.Text className="title">Welcome!</components_1.Text>
                <components_1.Text className="content">Enter equation to calc dice</components_1.Text>
              </components_1.View>
            </components_1.Block>)}
        </components_1.View>
        
        <components_1.View className="container">
          <components_1.View className="widget-head">charater sheet</components_1.View>
          <components_1.View className="container_box">
            {ability_sheet.map((item, index) => {
            return (<components_1.Block key="id">
                  <components_1.View className="sheet_basic" id='{item.id}'>
                    <components_1.Text />
                    <components_1.View className="good-body">
                      {item.ability.map((ability, index) => {
                return (<components_1.Block key="id">
                            <components_1.View className={'good-item ' + item.grid_type} 
                // onClick
                data-id={ability.id}>
                              <components_1.View className="good-desc">
                                <components_1.Text className="sheet_name">
                                  {ability.name}
                                </components_1.Text>
                                <components_1.Input className="sheet_Value" type="number" data-value={item} data-id={ability.id} onInput={this.inputChangeStat}/>
                              </components_1.View>
                            </components_1.View>
                          </components_1.Block>);
            })}
                    </components_1.View>
                  </components_1.View>
                </components_1.Block>);
        })}
          </components_1.View>
        </components_1.View>
        <components_1.View className="bf-footer"></components_1.View>
        <components_1.View className="footer">
          <components_1.Navigator url="../setting/setting" className="setting tappable">设置</components_1.Navigator>
          
          <components_1.Navigator url="../logs/logs" className="remove-done tappable" onClick={this.handleClick.bind(this, 1)}>记录</components_1.Navigator>
        </components_1.View>
        
        <taro_ui_1.AtFloatLayout title='logs' isOpened={isOpened1} onClose={this.handleClose.bind(this, '1')}>
      
      <components_1.Block>
        
          
          {console.log(this.state.logs)}
          {this.state.logs.length && (<components_1.View className="logs">
              {this.state.logs.map((item, index) => {
            return (<components_1.View className="item">
                    <components_1.Text className="timestamp">
                      {'[' + item.timestamp.toString() + ']'}
                    </components_1.Text>
                    <components_1.Text className="name">{item.name}</components_1.Text>
                    <components_1.Text className="action">{item.action}</components_1.Text>
                  </components_1.View>);
        })}
            </components_1.View>)}
        
      </components_1.Block>
    </taro_ui_1.AtFloatLayout>

      </components_1.Block>);
    }
};
Index = __decorate([
    redux_1.connect(({ counter, sheet }) => ({ counter, sheet }), (dispatch) => ({
        add() {
            dispatch(counter_1.add());
        },
        dec() {
            dispatch(counter_1.minus());
        },
        asyncAdd() {
            dispatch(counter_1.asyncAdd());
        }
    }))
], Index);
// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
exports.default = Index;
//# sourceMappingURL=index.jsx.map