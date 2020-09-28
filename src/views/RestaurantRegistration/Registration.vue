<template>
  <div class="wrapper">
    <div v-if="!isConfirm">
      <AlertToast :alertMessage="alertMessage" />
      <Headline headline="店舗登録" />
      <SubHead subHead="店舗情報" />
      <RegistrationForm
        :textFormGetter="getValueForTextFormList"
        :textFormSetter="setValueForTextFormList"
        :textFormValidationStateSetter="setValidationStateForTextFormList"
        :selectFormGetter="getValueForSelectFormList"
        :selectFormSetter="setValueForSelectFormList"
        :selectFormValidationStateSetter="setValidationStateForSelectFormList"
        :textFormList="textFormList"
        :selectFormList="selectFormList"
        :tagFormList="tagFormList"
        :tagStateSwitcher="tagStateSwitcher"
        :genreOptions="genreOptions"
      />
      <Button message="確認画面に進む" :action="confirmButtonAction" />
    </div>
    <div v-else>
      <Headline headline="店舗登録入力確認" />
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
import RegistrationForm from "@/components/RestaurantRegistration/Templates/RegistrationForm.vue";
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
          title: "店名",
          cautionMessage: "",
          required: true,
          propatyName: "name",
          placeholder: "リズグル食堂",
          value: "小宮食堂",
          validationState: false,
        },
        nameKana: {
          title: "店名(カナ)",
          required: true,
          propatyName: "nameKana",
          cautionMessage: "※全角カタカナ",
          placeholder: "リズグルショクドウ",
          value: "コミヤショクドウ",
          validationState: false,
        },
        phoneNumber: {
          title: "電話番号",
          required: true,
          propatyName: "phoneNumber",
          cautionMessage: "半角数字＋ハイフン",
          placeholder: "03-5919-1033",
          value: "03-5919-1033",
          validationState: false,
        },
        address: {
          title: "住所(都道府県・市区町村・番地)",
          required: true,
          propatyName: "address",
          placeholder: "新宿区四谷2-4-1",
          value: "東京都稲城市若葉台２丁目１２",
          validationState: false,
        },
        buildingName: {
          title: "住所(建物名・階数)",
          required: false,
          propatyName: "buildingName",
          placeholder: "ACN四谷ビル6F",
          value: "ファインストーリア スカイツインズベルタワー(B棟)",
        },
        openingHours: {
          title: "営業時間",
          required: true,
          propatyName: "openingHours",
          placeholder: "10:45〜15:30  17:30〜21:00",
          value: "10:45〜15:30",
          validationState: false,
        },
        regularHoliday: {
          title: "定休日",
          required: true,
          propatyName: "regularHoliday",
          placeholder: "土・日・祝",
          value: "土・日・祝",
          validationState: false,
        },
        access: {
          title: "交通手段",
          required: false,
          propatyName: "access",
          placeholder: "四ツ谷駅から徒歩5分",
          value: "若葉台駅から徒歩10分",
        },
        paymentMethod: {
          title: "支払方法",
          required: false,
          propatyName: "paymentMethod",
          placeholder: "現金、クレジットカード",
          value: "PayPay",
        },
        homePage: {
          title: "ホームページ",
          required: false,
          propatyName: "homePage",
          placeholder: "https://rizuguru.jp/",
          value: "",
        },
        twitter: {
          title: "Twitter",
          required: false,
          propatyName: "twitter",
          placeholder: "https://twitter.com/rizuguru",
          value: "",
        },
        facebook: {
          title: "Facebook",
          required: false,
          propatyName: "facebook",
          placeholder: "https://www.facebook.com/rizuguru",
          value: "",
        },
        instagram: {
          title: "Instagram",
          required: false,
          propatyName: "instagram",
          placeholder: "https://instagram.com/rizuguru",
          value: "",
        },
      },
      selectFormList: {
        genre1: {
          title: "ジャンル1",
          required: true,
          propatyName: "genre1",
          value: 1,
          validationState: false,
        },
        genre2: {
          title: "ジャンル2",
          required: false,
          propatyName: "genre2",
          value: null,
        },
        genre3: {
          title: "ジャンル3",
          required: false,
          propatyName: "genre3",
          value: null,
        },
      },
      tagFormList: {
        title: "タグ",
        required: false,
        data: [],
      },
      genreOptions: [],
      confirmList: [],
      fields: [],
    };
  },
  mounted() {
    this.$axios
      .get(`https://func-rizuguru.azurewebsites.net/api/GetGenre?`)
      .then((res) => {
        this.genreOptions = res.data;
        this.genreOptions.unshift({ id: null, name: "未選択" });
      });
    this.$axios
      .get(`https://func-rizuguru.azurewebsites.net/api/GetTag?`)
      .then((res) => {
        this.tagFormList.data = res.data
          .filter((e) => e.id > 10)
          .map((e) => {
            e.state = false;
            return e;
          });
      });
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
    getValueForSelectFormList(propatyName) {
      return this.selectFormList[`${propatyName}`].value;
    },
    setValueForSelectFormList(obj) {
      this.selectFormList[`${obj.propatyName}`].value = obj.value;
    },
    setValidationStateForSelectFormList(obj) {
      this.selectFormList[`${obj.propatyName}`].validationState = obj.state;
    },
    tagStateSwitcher(index) {
      this.tagFormList.data[index].state = !this.tagFormList.data[index].state;
    },
    confirmButtonAction() {
      // 未入力の必須項目の有無を確認
      var textFormStateArr = Enumerable.from(this.textFormList)
        .where((x) => x.value.required == true)
        .select((x) => x.value.validationState)
        .toArray();
      var selectFormStateArr = Enumerable.from(this.selectFormList)
        .where((x) => x.value.required == true)
        .select((x) => x.value.validationState)
        .toArray();
      if (
        !textFormStateArr.includes(false) &&
        !selectFormStateArr.includes(false)
      ) {
        if (!this.isConfirm) {
          // 入力画面から確認画面への遷移の場合
          // 入力フォームの結果を配列化
          var textFormResult = Enumerable.from(this.textFormList).toArray();
          var selectFormResult = Enumerable.from(this.selectFormList).toArray();
          var tagFormResult = Enumerable.from(this.tagFormList.data)
            .where((x) => x.state == true)
            .select((x) => x.tagContent)
            .toArray()
            .join("・");
          textFormResult = textFormResult.map((e) => ({
            key: e.value.title,
            value: e.value.value,
          }));
          selectFormResult = selectFormResult.map((e) => ({
            key: e.value.title,
            value: Enumerable.from(this.genreOptions)
              .where((x) => x.id == e.value.value)
              .select((x) => x.name)
              .single(),
          }));
          textFormResult.forEach((e) => this.confirmList.push(e));
          selectFormResult.forEach((e) => this.confirmList.push(e));
          this.confirmList.push({ key: "タグ", value: tagFormResult });
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
      var genreIds = Enumerable.from(this.selectFormList)
        .where((x) => x.value.value != null)
        .select((x) => x.value.value)
        .toArray();
      var tagIds = Enumerable.from(this.tagFormList.data)
        .where((x) => x.state == true)
        .select((x) => x.id)
        .toArray();
      var linkGenreIds = [];
      var urls = [];
      if (this.textFormList.homePage.value != "") {
        linkGenreIds.push(1);
        urls.push(this.textFormList.homePage.value);
      }
      if (this.textFormList.twitter.value != "") {
        linkGenreIds.push(3);
        urls.push(this.textFormList.twitter.value);
      }
      if (this.textFormList.facebook.value != "") {
        linkGenreIds.push(4);
        urls.push(this.textFormList.facebook.value);
      }
      if (this.textFormList.instagram.value != "") {
        linkGenreIds.push(5);
        urls.push(this.textFormList.instagram.value);
      }
      this.$axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${this.textFormList.address.value}&components=country:JP&key=AIzaSyBoh8D4HaNFoW-IzGEm-Lsx5zqPEhdJ398`
        )
        .then((res) => {
          var coord = res.data.results[0].geometry.location;
          this.$axios.post(
            "https://func-rizuguru.azurewebsites.net/api/AddRestaurant?",
            {
              Name: this.textFormList.name.value,
              NameKana: this.textFormList.nameKana.value,
              Address:
                this.textFormList.address.value +
                " " +
                this.textFormList.buildingName.value,
              Latitude: coord.lat,
              Longitude: coord.lng,
              Access: this.textFormList.access.value,
              PhoneNumber: this.textFormList.phoneNumber.value,
              OpeningHours: this.textFormList.openingHours.value,
              RegularHoliday: this.textFormList.regularHoliday.value,
              PaymentMethod: this.textFormList.paymentMethod.value,
              GenreId: genreIds,
              Url: urls,
              LinkGenreId: linkGenreIds,
              TagId: tagIds,
            }
          );
        })
        .catch((err) => alert(err));
      this.$router.push("/RestaurantRegistration/Complete");
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