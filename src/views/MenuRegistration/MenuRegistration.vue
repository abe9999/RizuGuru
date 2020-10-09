<template>
  <div class="menu-wrapper">
    <div v-if="!isConfirm">
      <AlertToast :alertMessage="alertMessage" />
      <Headline headline="メニュー登録" />
      <SubHead subHead="メニュー情報" />
      <b-row>
        <b-col cols="12" md="4">
          <SelectNameUnit @select="selectAction" />
          <RegistrationForm
            :textFormGetter="getValueForTextFormList"
            :textFormSetter="setValueForTextFormList"
            :textFormValidationStateSetter="setValidationStateForTextFormList"
            :textFormList="textFormList"
            v-if="restaurantId"
          />
          <Button
            message="追加"
            :action="addButtonAction"
            v-if="restaurantId"
          />
        </b-col>
        <b-col cols="12" md="8">
          <MenuList
            :menus="menus"
            @update="updateAction"
            @remove="removeAction"
          />
        </b-col>
      </b-row>
      <Button message="確認画面に進む" :action="confirmButtonAction" />
    </div>
    <div v-else>
      <Headline headline="メニュー登録入力確認" />
      <SubHead subHead="以下の内容で登録してよろしいですか？" />
      <table class="resultTable">
        <tr>
          <th>メニュー名</th>
          <th>メニュー名(カナ)</th>
          <th>値段</th>
        </tr>
        <tr v-for="(menu, index) in menus" :key="index">
          <td>{{ menu.name }}</td>
          <td>{{ menu.nameKana }}</td>
          <td>{{ menu.price }}</td>
        </tr>
      </table>
      <Button message="入力画面に戻る" :action="confirmButtonAction" />
      <Button message="登録" :action="submitButtonAction" />
    </div>
  </div>
</template>

<script>
import Enumerable from "linq";
import { getMenu } from "@/plugins/getMenu.js";
import { addMenu } from "@/plugins/addMenu.js";
import { deleteMenu } from "@/plugins/deleteMenu.js";
import { leaveGuard } from "@/plugins/leaveGuard.js";
import Button from "@/components/Atoms/Button.vue";
import Headline from "@/components/Molecules/Headline.vue";
import SubHead from "@/components/Molecules/SubHead.vue";
import AlertToast from "@/components/Molecules/AlertToast.vue";
import SelectNameUnit from "@/components/Molecules/SelectNameUnit.vue";
import RegistrationForm from "@/components/Templates/MenuRegistration/RegistrationForm.vue";
import MenuList from "@/components/Templates/MenuRegistration/MenuList.vue";

export default {
  components: {
    Headline,
    SubHead,
    SelectNameUnit,
    RegistrationForm,
    Button,
    AlertToast,
    MenuList,
  },
  mixins: [leaveGuard],
  data() {
    return {
      isConfirm: false,
      alertMessage: "",
      textFormList: {
        name: {
          title: "メニュー名",
          cautionMessage: "",
          required: true,
          propertyName: "name",
          placeholder: "リズグル丼",
          value: "",
          validationState: false,
        },
        nameKana: {
          title: "メニュー(カナ)",
          required: false,
          propertyName: "nameKana",
          cautionMessage: "※全角カタカナ",
          placeholder: "リズグルドン",
          value: "",
          validationState: false,
        },
        price: {
          title: "値段",
          required: true,
          propertyName: "price",
          cautionMessage: "※半角数字",
          placeholder: "750",
          value: "",
          validationState: false,
        },
      },
      restaurantId: null,
      menu: {},
      menus: [],
      deleteIds: [],
    };
  },
  methods: {
    getValueForTextFormList(propertyName) {
      return this.textFormList[`${propertyName}`].value;
    },
    setValueForTextFormList(obj) {
      this.textFormList[`${obj.propertyName}`].value = obj.value;
    },
    setValidationStateForTextFormList(obj) {
      this.textFormList[`${obj.propertyName}`].validationState = obj.state;
    },
    addButtonAction() {
      // 未入力の必須項目の有無を確認
      var textFormStateArr = Enumerable.from(this.textFormList)
        .where((x) => x.value.required == true)
        .select((x) => x.value.validationState)
        .toArray();
      if (textFormStateArr.includes(false)) {
        // 未入力の項目がある場合のトースト表示
        this.makeToast("danger");
        this.alertMessage = "未入力の項目があります";
        return;
      }
      this.menu = {
        id: "0000",
        restaurantId: this.restaurantId,
        name: this.textFormList.name.value,
        nameKana: this.textFormList.nameKana.value,
        price: this.textFormList.price.value,
      };
      this.menus.push(this.menu);
    },
    selectAction(selected) {
      if (selected) {
        this.restaurantId = selected;
        getMenu(selected).then((res) => (this.menus = res));
      }
    },
    updateAction(menuList) {
      this.menus = menuList;
    },
    removeAction(index) {
      if (this.menus[index].id != "0000") {
        this.deleteIds.push(this.menus[index].id);
      }
      this.menus.splice(index, 1);
    },
    confirmButtonAction() {
      // 表示コンポーネントの切り替え
      if (this.restaurantId == null) {
        alert("店名を選択してください。");
        return;
      }
      this.isConfirm = !this.isConfirm;
    },
    submitButtonAction() {
      // 登録処理
      addMenu(this.menus);
      deleteMenu(this.deleteIds);
      this.$router.push(`/MenuRegistration/Complete/`);
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
.menu-wrapper {
  width: 95%;
  margin: 20px auto 0 auto;
  font-size: 0.9em;
}
.basic {
  margin-left: 7%;
}
.resultTable {
  margin: 0 auto 20px auto;
  width: 80%;
}
.resultTable th,
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