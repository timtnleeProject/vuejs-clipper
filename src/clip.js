export default {
  methods: {
    clipToURL: function () {
      const type = 'image/jpeg'
      const quality = 1
      return new Promise((res, rej) => {
        const canvas = this.$refs.clipper.clip({ maxWPixel: 1920 });
        if (canvas.toBlob) {
          canvas.toBlob(
            (blob) => {
              if (this.clipResult) URL.revokeObjectURL(this.clipResult);
              this.clipResult = URL.createObjectURL(blob);
              this.link = this.clipResult;
              this.resultDone()
              res()
            },
            type, quality
          );
        } else {
          this.clipResult = canvas.toDataURL(type, quality);
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