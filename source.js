let my_vue = new Vue ({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    severity: ["info", "warning", "critical"],
    //Сюда будут прилетать алерты
    return: {
    json_raw: null,
    toggle_multiple: [0, 1, 2],
    },
    alerts: [],
    currentDate: 0,
    headers: [
      {
        text: 'time',
        align: 'start',
        sortable: true,
        value: "currentDate",
      },
      { text: 'severity', value: 'labels.severity' },
      { text: 'alertname', value: 'labels.alertname' },
      { text: 'instance', value: 'labels.instance' },
      { text: 'activeAt', value: 'activeAt' },
      { text: 'summary', value: 'annotations.summay' },
    ],
  },

  created: function() {       //здесь они будут конвертироваться
    axios 
      .get('http://au_prm.akvnzm.ru:9090/api/v1/alerts')
      .then(response => this.json_raw = response)
      .then(response => console.log(this.json_raw))
      .then(response => this.alerts = this.json_raw.data.data.alerts)
      .then(response => console.log(this.alerts))
  },

  //   convertMS: function( milliseconds ) {
  //     var day, hour, minute, seconds;
  //     seconds = Math.floor(milliseconds / 1000);
  //     minute = Math.floor(seconds / 60);
  //     seconds = seconds % 60;
  //     hour = Math.floor(minute / 60);
  //     minute = minute % 60;
  //     day = Math.floor(hour / 24);
  //     hour = hour % 24;
  //     return {
  //         day: day,
  //         hour: hour,
  //         minute: minute,
  //         seconds: seconds
  //     }
  //   },

  // },

  computed:{
    count_info: function() {
      return this.alerts.filter(item=>item.labels.severity=="info").length;
    },
    count_warning: function() {
      return this.alerts.filter(item=>item.labels.severity=="warning").length;
    },
    count_critical: function() {
      return this.alerts.filter(item=>item.labels.severity=="critical").length;
    },
    info_hidden: function() {
      return (Number(this.count_info) > 0) ? true : false;
    },
    warning_hidden: function() {
      return (Number(this.count_warning) > 0) ? true : false;
    },
    critical_hidden: function() {
      return (Number(this.count_critical) > 0) ? true : false;
    },
  },
})

// setInterval(my_vue.updateTime, 1000);