// pages/room/room.js
const appNote = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerList:[],
    playRound:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  roundValue(e){
    
    this.setData({
      playRound:e.detail.value
    })
  },

  addPlayer(){
    let pl = this.data.playerList;
    if(pl.length >= 8)
    {
      wx.showToast({title:"人数到达上限", icon:"error"});
      return;
    }

    let player = {index:pl.length + 1}

    this.data.playerList.push(player);
    this.setData({
      playerList:this.data.playerList
    })
  },
  setName(e)
  {
    let listid = e.target.dataset.id;
    this.data.playerList[listid].name = e.detail.value;
  },
  delPlayer(e){
    let listid = e.target.dataset.id;
    this.data.playerList.splice(listid, 1);
    this.setData({
      playerList:this.data.playerList
    })
  },
  back(){
    wx.navigateBack();
  },
  player(){
    let pl = this.data.playerList;
    if(pl.length < 1)
    {
      wx.showToast({title:"人数必须大于一人才可以开始游戏", icon:"none"});
      return;
    }
    if(this.data.playRound < 1)
    {
      wx.showToast({title:"轮数必须大于一才可以开始游戏", icon:"none"});
      return;
    }
    appNote.globalData.playerList = this.data.playerList;
    appNote.globalData.playerCount = this.data.playerList.length;
    appNote.globalData.playRound = this.data.playRound;
    wx.redirectTo({
      url:"../game/game",
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})