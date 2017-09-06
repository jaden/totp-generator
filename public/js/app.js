function getCurrentSeconds() {
  return Math.round(new Date().getTime() / 1000.0);
}

function stripSpaces(str) {
  return str.replace(/\s/g, '');
}

new Vue({
  el: '#app',
  data: {
    secret_key: 'JBSWY3DPEHPK3PXP',
    updatingIn: 0,
    token: null
  },

  mounted: function () {
    this.update();

    this.intervalHandle = setInterval(this.update, 1000);
  },

  destroyed: function () {
    clearInterval(this.intervalHandle);
  },

  computed: {
    totp: function () {
      return new OTPAuth.TOTP({
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromB32(stripSpaces(this.secret_key))
      });
    }
  },

  methods: {
    update: function () {
      this.updatingIn = 30 - (getCurrentSeconds() % 30);
      this.token = this.totp.generate();
    }
  }
});
