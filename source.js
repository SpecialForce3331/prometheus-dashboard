let my_vue = new Vue ({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    severity: ["info", "warning", "critical"],
    //Сюда будут прилетать алерты
    json_raw: `{
            "status": "success",
            "data": {
              "alerts": [
                {
                  "labels": {
                    "alertname": "KAVAgentServiceUnavailable",
                    "instance": "mbe.akvnzm.ru:9182",
                    "job": "wmi_exporters",
                    "name": "klnagent",
                    "severity": "info",
                    "state": "running"
                  },
                  "annotations": {
                    "summay": "Endpoint mbe.akvnzm.ru:9182 has not working KAVAgent service!"
                  },
                  "state": "pending",
                  "activeAt": "2020-03-19T17:46:12.045370358Z",
                  "value": "0e+00"
                },
                {
                  "labels": {
                    "alertname": "KAVAgentServiceCritical",
                    "instance": "mbe.akvnzm.ru:9182",
                    "job": "wmi_exporters",
                    "name": "klnagent",
                    "severity": "warning",
                    "state": "running"
                  },
                  "annotations": {
                    "summay": "Endpoint mbe.akvnzm.ru:9182 has not working KAVAgent service!"
                  },
                  "state": "pending",
                  "activeAt": "2020-03-19T17:46:13.780286546Z",
                  "value": "0e+00"
                },
                {
                  "labels": {
                    "alertname": "KAVAgentServiceInfo",
                    "instance": "mbe.akvnzm.ru:9182",
                    "job": "wmi_exporters",
                    "name": "klnagent",
                    "severity": "critical",
                    "state": "running"
                  },
                  "annotations": {
                    "summay": "Endpoint mbe.akvnzm.ru:9182 has not working KAVAgent service!"
                  },
                  "state": "pending",
                  "activeAt": "2020-03-19T17:46:18.418808565Z",
                  "value": "0e+00"
                },
                {
                  "labels": {
                    "alertname": "KAVAgentServiceInfo",
                    "instance": "mbe.akvnzm.ru:9182",
                    "job": "wmi_exporters",
                    "name": "klnagent",
                    "severity": "warning",
                    "state": "running"
                  },
                  "annotations": {
                    "summay": "Endpoint mbe.akvnzm.ru:9182 has not working KAVAgent service!"
                  },
                  "state": "pending",
                  "activeAt": "2020-03-19T17:46:18.418808565Z",
                  "value": "0e+00"
                },
                {
                  "labels": {
                    "alertname": "KAVAgentServiceInfo",
                    "instance": "mbe.akvnzm.ru:9182",
                    "job": "wmi_exporters",
                    "name": "klnagent",
                    "severity": "critical",
                    "state": "running"
                  },
                  "annotations": {
                    "summay": "Endpoint mbe.akvnzm.ru:9182 has not working KAVAgent service!"
                  },
                  "state": "pending",
                  "activeAt": "2020-03-19T17:46:18.418808565Z",
                  "value": "0e+00"
                },
                {
                  "labels": {
                    "alertname": "KAVAgentServiceInfo",
                    "instance": "mbe.akvnzm.ru:9182",
                    "job": "wmi_exporters",
                    "name": "klnagent",
                    "severity": "critical",
                    "state": "running"
                  },
                  "annotations": {
                    "summay": "Endpoint mbe.akvnzm.ru:9182 has not working KAVAgent service!"
                  },
                  "state": "pending",
                  "activeAt": "2020-03-19T17:46:18.418808565Z",
                  "value": "0e+00"
                }
              ]
            }
          }`,
    logs: [],
    f_logs: [],
    headers: [
      {
        text: 'date',
        align: 'start',
        sortable: true,
        value: 'date',
      },
      { text: 'severity', value: 'labels.severity' },
      { text: 'alertname', value: 'labels.alertname' },
      { text: 'instance', value: 'labels.instance' },
      { text: 'activeAt', value: 'activeAt' },
      { text: 'summary', value: 'annotations.summay' },
    ],
  },

  created: function() {       //здесь они будут конвертироваться
    this.logs = JSON.parse(this.json_raw);
    for(item of this.logs.data.alerts) {
      this.f_logs.push(item);
    }
  },

  computed:{
    count_info: function() {
      return this.f_logs.filter(item=>item.labels.severity=="info").length;
    },
    count_warning: function() {
      return this.f_logs.filter(item=>item.labels.severity=="warning").length;
    },
    count_critical: function() {
      return this.f_logs.filter(item=>item.labels.severity=="critical").length;
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