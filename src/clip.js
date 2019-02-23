export default {
  methods: {
    clipToURL: function () {
      return new Promise((res, rej) => {
        const canvas = this.$refs.clipper.clip();
        if (canvas.toBlob) {
          canvas.toBlob(
            (blob) => {
              if (this.clipResult) URL.revokeObjectURL(this.clipResult);
              this.clipResult = URL.createObjectURL(blob);
              this.link = this.clipResult;
              this.resultDone()
              res()
            },
            'image/png', 1
          );
        } else {
          this.clipResult = canvas.toDataURL('image/png', 1);
          this.link = this.clipResult;
          this.resultDone()
          res()
        }
      })
    },
    resultDone: function () {
      this.done = true;
    }
  }
};