<template>
  <div class="wrapper">
    <div v-if="!isConfirm">
      <AlertToast :alertMessage="alertMessage" />
      <Headline headline="メニュー登録" />
      <SubHead subHead="メニュー情報" />
      <RegistrationForm
        :textFormGetter="getValueForTextFormList"
        :textFormSetter="setValueForTextFormList"
        :textFormValidationStateSetter="setValidationStateForTextFormList"
        :textFormList="textFormList"
      />
      <Button message="確認画面に進む" :action="confirmButtonAction" />
    </div>
    <div v-else>
      <Headline headline="メニュー登録入力確認" />
      <SubHead subHead="以下の内容で登録してよろしいですか？" />
      <table class="resultTable">
        <tr v-for="(col, index) in confirmList" :key="index">
          <td>{{ col.key }}</td>
          <td>{{ col.value }}</td>
        </tr>
      </table>
      <Button message="入力画面に戻る" :action="confirmButtonAction" />
      <Button message="登録" :action="submitButtonAction" />
    </div>
  </div>
</template>

<script>
import Headline from "@/components/RestaurantRegistration/Molecules/Headline.vue";
import SubHead from "@/components/RestaurantRegistration/Molecules/SubHead.vue";
import RegistrationForm from "@/components/MenuRegistration/RegistrationForm.vue";
import Button from "@/components/RestaurantRegistration/Atoms/Button.vue";
import AlertToast from "@/components/RestaurantRegistration/Molecules/AlertToast.vue";
import Enumerable from "linq";
export default {
  components: {
    Headline,
    SubHead,
    RegistrationForm,
    Button,
    AlertToast,
  },
  data() {
    return {
      isConfirm: false,
      alertMessage: "",
      textFormList: {
        name: {
          title: "メニュー名",
          cautionMessage: "",
          required: true,
          propatyName: "name",
          placeholder: "リズグル丼",
          value: "リズグル丼",
          validationState: false,
        },
        nameKana: {
          title: "メニュー(カナ)",
          required: false,
          propatyName: "nameKana",
          cautionMessage: "※全角カタカナ",
          placeholder: "リズグルドン",
          value: "リズグルドン",
          validationState: false,
        },
        price: {
          title: "値段",
          required: true,
          propatyName: "price",
          cautionMessage: "※半角数字",
          placeholder: "750",
          value: "750",
          validationState: false,
        },
      },
      confirmList: [],
      fields: [],
    };
  },
  methods: {
    getValueForTextFormList(propatyName) {
      return this.textFormList[`${propatyName}`].value;
    },
    setValueForTextFormList(obj) {
      this.textFormList[`${obj.propatyName}`].value = obj.value;
    },
    setValidationStateForTextFormList(obj) {
      this.textFormList[`${obj.propatyName}`].validationState = obj.state;
    },
    confirmButtonAction() {
      // 未入力の必須項目の有無を確認
      var textFormStateArr = Enumerable.from(this.textFormList)
        .where((x) => x.value.required == true)
        .select((x) => x.value.validationState)
        .toArray();
      if (!textFormStateArr.includes(false)) {
        if (!this.isConfirm) {
          // 入力画面から確認画面への遷移の場合
          // 入力フォームの結果を配列化
          var textFormResult = Enumerable.from(this.textFormList).toArray();
          textFormResult = textFormResult.map((e) => ({
            key: e.value.title,
            value: e.value.value,
          }));
          textFormResult.forEach((e) => this.confirmList.push(e));
        } else {
          // 確認画面から入力画面への遷移の場合
          // 結果表示テーブル用の変数を空に
          this.confirmList = [];
        }
        // 表示コンポーネントの切り替え
        this.isConfirm = !this.isConfirm;
      } else {
        // 未入力の項目がある場合のトースト表示
        this.makeToast("danger");
        this.alertMessage = "未入力の項目があります";
      }
    },
    submitButtonAction() {
      // 登録処理を入れる
      this.$axios
        .post("https://func-rizuguru.azurewebsites.net/api/AddMenu?", {
          RestaurantId: this.$route.params.id,
          Name: this.textFormList.name.value,
          NameKana: this.textFormList.nameKana.value,
        })
        .catch((err) => alert(err));
      this.$router.push(`/MenuRegistration/${this.$route.params.id}/Complete/`);
    },
    makeToast(variant = null) {
      this.$bvToast.toast("未入力の項目があります", {
        title: "注意！",
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin-left: 50px;
  margin-top: 20px;
  font-size: 0.9em;
}

.resultTable {
  margin: 0 auto;
  width: 80%;
}

.resultTable td {
  padding: 5px 10px;
}

.resultTable tr:nth-child(2n) {
  background-color: #f6f6f6;
}
.resultTable tr:nth-child(2n-1) {
  background-color: #b8e0be;
}
</style>