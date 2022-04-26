<template>
  <div class="root">
    <l-button type="text" @click="dialogVisible = true"
      >click to open the Dialog</l-button
    >

    <l-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
          <l-button size="small" @click="dialogVisible = false">取消</l-button>
          <l-button size="small" type="primary" @click="dialogVisible = false"
            >确定</l-button
          >
      </template>
    </l-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        done()
      }
    }
  };
</script>
<style>
.root {
  
  padding: 100px 50px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

/* .l-carousel-item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.l-carousel-item:nth-child(2n) {
  background-color: #99a9bf;
}

.l-carousel-item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
