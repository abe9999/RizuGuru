<template>
  <div class="wrapper">
    <Headline headline="写真登録" />
    <SubHead subHead="写真情報" />
    <SelectNameUnit @select="selectAction" />
    <form id="image-form">
      <table id="image-table" border="1">
        <tr v-for="(item, index) in items" :key="index">
          <th>{{ item.title }}</th>
          <td>
            <img class="image-view" />
          </td>
          <td>
            <input
              ref="file"
              :id="item.buttonId"
              class="file-button"
              type="file"
              @change="getIndex(index)"
            />
            <b-button variant="success" tag="label" :for="item.buttonId">
              画像を選択
            </b-button>
          </td>
        </tr>
      </table>
    </form>
    <Button message="登録" :action="submitButtonAction" />
    <hr />
  </div>
</template>

<script>
import Headline from "@/components/Molecules/Headline.vue";
import SubHead from "@/components/Molecules/SubHead.vue";
import SelectNameUnit from "@/components/Molecules/SelectNameUnit.vue";
import Button from "@/components/Atoms/Button.vue";
import { uploadImages } from "@/plugins/uploadImages.js";

export default {
  components: {
    Headline,
    SubHead,
    SelectNameUnit,
    Button,
  },
  data() {
    return {
      restaurantId: null,
      image: "",
      images: [
        { id: null, restaurantId: null, image: "" },
        { id: null, restaurantId: null, image: "" },
        { id: null, restaurantId: null, image: "" },
        { id: null, restaurantId: null, image: "" },
        { id: null, restaurantId: null, image: "" },
      ],
      items: [
        { id: 1, title: "料理写真1", buttonId: "button1" },
        { id: 2, title: "料理写真2", buttonId: "button2" },
        { id: 3, title: "内観写真1", buttonId: "button3" },
        { id: 4, title: "内観写真2", buttonId: "button4" },
        { id: 5, title: "外観写真", buttonId: "button5" },
      ],
    };
  },
  methods: {
    selectAction(selected) {
      this.restaurantId = selected;
    },
    getIndex(index) {
      this.upload(index, event);
    },
    async upload(index, event) {
      var file = event.target.files[0] || event.dataTransfer.files[0];

      if (this.checkFile(file)) {
        let element = document.getElementById(event.target.id);
        element.parentNode.previousElementSibling.firstChild.src = await this.getBase64(
          file
        );
        this.images[index].id = index + 1;
        this.images[index].image = await this.getBase64(file);
      }
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    checkFile(file) {
      let result = true;
      const SIZE_LIMIT = 5000000; // 5MB
      // キャンセルしたら処理中断
      if (!file) {
        result = false;
      }
      // jpeg か png 関連ファイル以外は受付けない
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        result = false;
      }
      // 上限サイズより大きければ受付けない
      if (file.size > SIZE_LIMIT) {
        result = false;
      }
      return result;
    },
    submitButtonAction() {
      // 確認ダイアログの表示
      if (this.restaurantId == null) {
        alert("店名を選択してください。");
        return;
      }
      var confirm = window.confirm("この内容で登録しますか？");
      if (confirm) {
        this.images.forEach((x) => {
          x.restaurantId = this.restaurantId;
          x.image = x.image.split(",")[1];
        });
        uploadImages(this.images);
      } else {
        return;
      }
      this.$router.push("/ImageRegistration/Complete/");
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 95%;
  margin-top: 20px;
  margin-left: 2.5%;
}
#image-table {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
#image-table tr {
  height: 200px;
}
#image-table th:nth-child(1) {
  width: 25%;
}
#image-table td:nth-child(3) {
  width: 35%;
}
.file-button {
  display: none;
}
.image-view {
  max-width: 240px;
  max-height: 180px;
}

@media screen and (max-width: 560px) {
  #image-table tr {
    height: 100px;
  }
  .image-view {
    max-width: 120px;
    max-height: 90px;
  }
}
</style>