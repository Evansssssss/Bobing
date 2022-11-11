// pages/game.js
const app = getApp();
const levelMap = {
  2:"zy",3:"dt",4:"sh",5:"sj",6:"ej",7:"yx"
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    playerList:[],
    playHistory:[],
    diceLevel:["未中奖", "状元插金花", "状元", "对堂", "三红", "四进", "二举", "一秀"],
    rankList:{},
    playerCount:0,
    isGrap:null,
    isHide:true,
    isHideGO:true,
    curRoll:1,
    totalRoll:0,
    diceCount:0,
    curPlayer:0,
    dice1:1,
    dice2:1,
    dice3:1,
    dice4:1,
    dice5:1,
    dice6:1,
  },
  Roll(e){
    if(!this.data.isGrap)
    {
      this.setData({
        isGrap:true
      });
      this.rollDice();
    }
  },
    
  rollDice(){
    if(this.data.diceCount < 10){
      let di1 = Math.floor(Math.random()*5+1);
      let di2 = Math.floor(Math.random()*5+1);
      let di3 = Math.floor(Math.random()*5+1);
      let di4 = Math.floor(Math.random()*5+1);
      let di5 = Math.floor(Math.random()*5+1);
      let di6 = Math.floor(Math.random()*5+1);

      this.setData({
        dice1: di1,
        dice2: di2,
        dice3: di3,
        dice4: di4,
        dice5: di5,
        dice6: di6
      })
      this.setData({
        diceCount: this.data.diceCount+1
      })
      setTimeout(this.rollDice, 100);
    }
    else
    {
      let level = this.checkRes();
      let idx = this.data.curPlayer;
      let player = this.data.playerList[idx];
      let history = {
        num:this.data.playHistory.length + 1,
        name:player.name,
        levelN:level,
        level:this.data.diceLevel[level],
        d1:this.data.dice1,
        d2:this.data.dice2,
        d3:this.data.dice3,
        d4:this.data.dice4,
        d5:this.data.dice5,
        d6:this.data.dice6,
      }

      wx.showToast({title: this.data.diceLevel[level], icon:"none"});
      this.data.playHistory.unshift(history);

      if(level > 1)
      {
        let ln = levelMap[level]
        this.data.rankList[this.data.curPlayer][ln]++;
      }


      this.setData({
        diceCount:0,
        curPlayer:this.data.curPlayer+1,
        playHistory:this.data.playHistory,
        rankList:this.data.rankList,
        isGrap:false
      })

      if(this.data.curPlayer == this.data.playerCount)
      {
        if(this.data.curRoll < this.data.totalRoll)
        {
          this.setData({
            curPlayer:0,
            curRoll:this.data.curRoll+1
          })
        }
        else{
          this.setData({
            isHideGO:false,
          })
        }
      }
    }
  },
  checkRes(){
    let nlist = [
      this.data.dice1, 
      this.data.dice2,
      this.data.dice3,
      this.data.dice4,
      this.data.dice5,
      this.data.dice6,
    ]
    let n1 = this.checkNum(nlist, 1);
    let n2 = this.checkNum(nlist, 2);
    let n3 = this.checkNum(nlist, 3);
    let n4 = this.checkNum(nlist, 4);
    let n5 = this.checkNum(nlist, 5);
    let n6 = this.checkNum(nlist, 6);
    if(n1 > 4 || n2 > 4 || n3 > 4 || n4 >= 4 || n5 > 4 || n6 > 4)
    {
      return 2;
    }
    if(n1 == 1 && n2 == 1 && n3 == 1 && n4 == 1 && n5 == 1 && n6 == 1)
    {
      return 3;      
    }
    if(n4 == 3)
    {
      return 4;      
    }
    if(n1 == 4 || n2 == 4  || n3 == 4 || n5 == 4  || n6 == 4 )
    {
      return 5;      
    }
    if(n4 == 2)
    {
      return 6;      
    }
    if(n4 == 1)
    {
      return 7;      
    }
    return 0;
  },
  checkNum(list, n)
  {
    let nu = 0;
    for (let index = 0; index < list.length; index++) {
      const ele = list[index];
      if(ele == n)
      {
        nu++;
      }
    }
    return nu;
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let pl = app.globalData.playerList;
    let ranklist = [];
    for (let index = 0; index < app.globalData.playerCount; index++) {
      pl[index].ex = true;
      ranklist.push({
        name:pl[index].name,
        zy:0,
        dt:0,
        sh:0,
        sj:0,
        ej:0,
        yx:0
      })
    }
    for (let index = pl.length; index < 8; index++) {
      const element = pl[index];
      pl.push({ex:false})
    }



    this.setData({
      totalRoll:app.globalData.playRound,
      playerCount:app.globalData.playerCount,
      playerList:pl,
      playHistory:[],
      rankList:ranklist,
      isHide:true,
      isHideGO:true,
      curRoll:1,
      curPlayer:0
    })

  },
  exit(){
    wx.navigateBack({
      delta: 1,
    })
  },
  restart(){
    this.onLoad();
  },
  watchRank(){
    this.setData({
      isHide:false
    })
  },
  closeRank(){
    this.setData({
      isHide:true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  }
})