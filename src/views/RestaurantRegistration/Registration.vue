<template>
  <section v-if="loading">
    <Loading />
  </section>
  <section class="wrapper" v-else-if="!loading">
    <b-container v-if="!isConfirm">
      <AlertToast />
      <b-row>
        <b-col>
          <Headline headline="店舗登録" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <SubHead subHead="店舗情報" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <RegistrationForm
            :formList="formList"
            :formValueGetter="getFormListValue"
            :formValueSetter="setFormListValue"
            :formValidationStateSetter="setValidationState"
            :tagStateSwitcher="tagStateSwitcher"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <Button message="確認画面に進む" :action="confirmButtonAction" />
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else>
      <b-row>
        <b-col>
          <Headline headline="店舗登録入力確認" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <SubHead subHead="以下の内容で登録してよろしいですか？" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <table class="resultTable">
            <tr v-for="(col, index) in confirmList" :key="index">
              <td>{{ col.key }}</td>
              <td>{{ col.value }}</td>
            </tr>
          </table>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col lg="3">
          <Button message="入力画面に戻る" :action="confirmButtonAction" />
        </b-col>
        <b-col lg="3">
          <Button message="登録" :action="submitButtonAction" />
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import Enumerable from "linq";
import restaurantRegistrationPostDataClass from "@/utils/class/restaurantRegistrationPostDataClass.js";
import { getGenresList } from "@/plugins/getGenresList.js";
import { getTagsList } from "@/plugins/getTagsList.js";
import { getCoord } from "@/plugins/getCoord.js";
import { getStation } from "@/plugins/getStation.js";
import { getGeoDistance } from "@/plugins/getGeoDistance.js";
import { addRestaurant } from "@/plugins/addRestaurant.js";
import { leaveGuard } from "@/plugins/leaveGuard.js";
// import { fetchPrefecture } from "@/plugins/fetchPrefecture.js";
import { fetchCity } from "@/plugins/fetchCity.js";
import { fetchTown } from "@/plugins/fetchTown.js";
import Loading from "@/components/Atoms/Loading.vue";
import Button from "@/components/Atoms/Button.vue";
import Headline from "@/components/Molecules/Headline.vue";
import SubHead from "@/components/Molecules/SubHead.vue";
import AlertToast from "@/components/Molecules/AlertToast.vue";
import RegistrationForm from "@/components/Templates/RestaurantRegistration/RegistrationForm.vue";

export default {
  components: {
    Loading,
    Headline,
    SubHead,
    RegistrationForm,
    Button,
    AlertToast,
  },
  mixins: [leaveGuard],
  data() {
    return {
      loading: true,
      isConfirm: false,
      formList: {
        name: {
          type: "text",
          title: "店名",
          cautionMessage: "",
          required: true,
          propertyName: "name",
          placeholder: "リズグル食堂",
          value: "",
          validationState: false,
        },
        nameKana: {
          type: "text",
          title: "店名(カナ)",
          required: true,
          propertyName: "nameKana",
          cautionMessage: "",
          placeholder: "リズグルショクドウ",
          value: "",
          validationState: false,
        },
        phoneNumber: {
          type: "text",
          title: "電話番号",
          required: true,
          propertyName: "phoneNumber",
          cautionMessage: "半角数字＋ハイフン",
          placeholder: "03-5919-1033",
          value: "",
          validationState: false,
        },
        prefecture: {
          type: "select",
          title: "都道府県",
          required: true,
          propertyName: "prefecture",
          value: null,
          validationState: false,
          options: [],
        },
        city: {
          type: "datalist",
          title: "市区町村",
          required: true,
          propertyName: "city",
          value: "",
          validationState: false,
          options: [],
          placeholder: "都道府県を選択してください",
          disabled: true,
          cautionMessage: "（例）新宿区",
        },
        town: {
          type: "datalist",
          title: "町名・番地",
          required: true,
          propertyName: "town",
          value: "",
          validationState: false,
          options: [],
          placeholder: "市区町村を入力してください",
          disabled: true,
          cautionMessage: "（例）四谷2-4-1",
        },
        buildingName: {
          type: "text",
          title: "建物名・階数",
          required: false,
          propertyName: "buildingName",
          value: "",
          validationState: false,
          options: [],
          placeholder: "町名・番地を入力してください",
          disabled: true,
          cautionMessage: "（例）ACN四谷ビル6F",
        },
        openingHours: {
          type: "text",
          title: "営業時間",
          required: true,
          propertyName: "openingHours",
          placeholder: "10:45〜15:30  17:30〜21:00",
          value: "",
          validationState: false,
        },
        regularHoliday: {
          type: "text",
          title: "定休日",
          required: true,
          propertyName: "regularHoliday",
          placeholder: "土・日・祝",
          value: "",
          validationState: false,
        },
        paymentMethod: {
          type: "text",
          title: "支払方法",
          required: true,
          propertyName: "paymentMethod",
          placeholder: "現金、クレジットカード",
          value: "",
          validationState: false,
        },
        homePage: {
          type: "text",
          title: "ホームページ",
          required: false,
          propertyName: "homePage",
          placeholder: "https://rizuguru.jp/",
          value: "",
        },
        blog: {
          type: "text",
          title: "ブログ",
          required: false,
          propertyName: "blog",
          placeholder: "https://rizuguru.blog/",
          value: "",
        },
        twitter: {
          type: "text",
          title: "Twitter",
          required: false,
          propertyName: "twitter",
          placeholder: "https://twitter.com/rizuguru",
          value: "",
        },
        facebook: {
          type: "text",
          title: "Facebook",
          required: false,
          propertyName: "facebook",
          placeholder: "https://www.facebook.com/rizuguru",
          value: "",
        },
        instagram: {
          type: "text",
          title: "Instagram",
          required: false,
          propertyName: "instagram",
          placeholder: "https://instagram.com/rizuguru",
          value: "",
        },
        genre1: {
          type: "select",
          title: "ジャンル1",
          required: true,
          propertyName: "genre1",
          value: null,
          validationState: false,
          options: [],
        },
        genre2: {
          type: "select",
          title: "ジャンル2",
          required: false,
          propertyName: "genre2",
          value: null,
          options: [],
        },
        genre3: {
          type: "select",
          title: "ジャンル3",
          required: false,
          propertyName: "genre3",
          value: null,
          options: [],
        },
        tagList: {
          type: "tag",
          title: "タグ",
          propertyName: "tagList",
          required: false,
          value: [],
        },
      },
      confirmList: [],
    };
  },
  mounted() {
    // 都道府県・ジャンル・タグのデータが取得できるまでローディングアイコンを表示
    Promise.all([
      this.fetchPrefecture(),
      this.getGenresList(),
      this.getTagsList(),
    ]).then(() => {
      this.loading = false;
    });
  },
  methods: {
    async getTagsList() {
      return new Promise((resolve) => {
        getTagsList().then((res) => {
          this.formList.tagList.value = res
            .filter((e) => e.id > 11)
            .map((e) => {
              e.state = false;
              return e;
            });
          resolve();
        });
      });
    },
    async getGenresList() {
      return new Promise((resolve) => {
        getGenresList().then((res) => {
          res.unshift({ id: null, name: "未選択" });
          this.formList.genre1.options = res;
          this.formList.genre2.options = res;
          this.formList.genre3.options = res;
          resolve();
        });
      });
    },
    async fetchPrefecture() {
      return new Promise((resolve) => {
        // APIから取得する場合
        // fetchPrefecture().then((res) => {
        //   var prefectureArr = res
        //     .filter((x) => x.activeKey == 1)
        //     .map((x) => ({ id: x.id, name: x.name }));
        //   prefectureArr.unshift({ id: null, name: "未選択" });
        //   this.formList.prefecture.options = prefectureArr;
        //   resolve();
        // });

        const prefectureArr = [
          { id: null, name: "未選択" },
          { id: 11, name: "埼玉県" },
          { id: 12, name: "千葉県" },
          { id: 13, name: "東京都" },
          { id: 14, name: "神奈川県" },
        ];
        this.formList.prefecture.options = prefectureArr;
        resolve();
      });
    },
    fetchCity(prefId) {
      this.formList.city.options = [];
      this.formList.town.options = [];
      fetchCity(prefId).then((res) => {
        var cityArr = res.map((x) => ({
          text: x.nameKana,
          value: x.name,
        }));
        this.formList.city.options = cityArr;
        this.formList.city.disabled = false;
        this.formList.city.placeholder = "市区町村を入力してください";
      });
    },
    fetchTown(cityName) {
      this.formList.town.options = [];
      fetchTown(cityName).then((res) => {
        var townArr = res.map((x) => x.town);
        townArr.map((x) =>
          x.map((y) =>
            this.formList.town.options.push({
              text: y.nameKana,
              value: y.name,
            })
          )
        );
        this.formList.town.disabled = false;
        this.formList.town.placeholder = "町名を入力してください";
      });
    },
    async getRangeFromNearestStation(origin, dest) {
      return new Promise((resolve, reject) => {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: origin,
            destinations: [dest],
            travelMode: "WALKING",
          },
          function (resp, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
              reject(status);
            } else {
              resolve(resp);
            }
          }
        );
      });
    },
    getFormListValue(propertyName) {
      return this.formList[`${propertyName}`].value;
    },
    setFormListValue(obj) {
      this.formList[`${obj.propertyName}`].value = obj.value;
    },
    setValidationState(obj) {
      this.formList[`${obj.propertyName}`].validationState = obj.state;
    },
    tagStateSwitcher(index) {
      this.formList.tagList.value[index].state = !this.formList.tagList.value[
        index
      ].state;
    },
    validateFormValue() {
      // 必須項目に未入力が含まれているか確認
      var formValueArr = Enumerable.from(this.formList)
        .where((x) => x.value.required == true)
        .select((x) => x.value.value)
        .toArray();
      return !formValueArr.includes("") ? true : false;
    },
    validateFormState() {
      // 不正な入力の有無を確認
      var formValidateArr = Enumerable.from(this.formList)
        .where((x) => x.value.required == true)
        .select((x) => x.value.validationState)
        .toArray();
      return !formValidateArr.includes(false) ? true : false;
    },
    confirmButtonAction() {
      if (this.validateFormValue()) {
        if (this.validateFormState()) {
          if (!this.isConfirm) {
            var formResult = Object.entries(this.formList).map((x) => x[1]);
            var address = { key: "住所", value: [] };
            formResult.forEach((x) => {
              switch (x.propertyName) {
                case "prefecture":
                  address.value.push(
                    x.options.find((y) => y.id == x.value).name
                  );
                  break;
                case "city":
                  address.value.push(x.value);
                  break;
                case "town":
                  address.value.push(x.value);
                  address.value = address.value.join("");
                  this.confirmList.push(address);
                  break;
                case "genre1":
                case "genre2":
                case "genre3":
                  this.confirmList.push({
                    key: x.title,
                    value: x.options.find((y) => y.id == x.value).name,
                  });
                  break;
                case "tagList":
                  this.confirmList.push({
                    key: x.title,
                    value: x.value
                      .filter((y) => y.state == true)
                      .map((z) => z.tagContent)
                      .join("・"),
                  });
                  break;
                default:
                  this.confirmList.push({ key: x.title, value: x.value });
                  break;
              }
            });
          } else {
            // 確認画面から入力画面への遷移の場合、結果表示テーブル用の変数を空に
            this.confirmList = [];
          }
          // 表示コンポーネントの切り替え
          this.isConfirm = !this.isConfirm;
        } else {
          this.makeToast("danger", "不正な入力/未選択の項目があります");
        }
      } else {
        this.makeToast("danger", "必須項目が未入力/未選択です");
      }
    },
    submitButtonAction() {
      // ローディングアイコンを表示
      this.loading = true;

      // 登録用のデータを定義
      // var postData = {
      //   Name: this.formList.name.value,
      //   NameKana: this.formList.nameKana.value,
      //   Address: null,
      //   Latitude: null,
      //   Longitude: null,
      //   Access: null,
      //   StationId: null,
      //   PhoneNumber: this.formList.phoneNumber.value,
      //   OpeningHours: this.formList.openingHours.value,
      //   RegularHoliday: this.formList.regularHoliday.value,
      //   PaymentMethod: this.formList.paymentMethod.value,
      //   GenreId: [],
      //   Url: [],
      //   LinkGenreId: [],
      //   TagId: [],
      // };

      var postData = new restaurantRegistrationPostDataClass({
        name: this.formList.name.value,
        nameKana: this.formList.nameKana.value,
        phoneNumber: this.formList.phoneNumber.value,
        openingHours: this.formList.openingHours.value,
        regularHoliday: this.formList.regularHoliday.value,
        paymentMethod: this.formList.paymentMethod.value,
      });

      // formListを配列化
      var formResult = Object.entries(this.formList).map((x) => x[1]);

      // ジャンルのIDを取得（未選択は除く）
      postData.GenreId = formResult
        .filter((x) => x.propertyName.includes("genre"))
        .filter((x) => x.value != null)
        .map((x) => x.value);

      // 選択したタグのIDを取得
      postData.TagId = formResult
        .find((x) => x.propertyName.includes("tagList"))
        .value.filter((x) => x.state == true)
        .map((x) => x.id);

      // ホームページなどのリンクを取得
      formResult.forEach((x) => {
        if (x.value) {
          switch (x.propertyName) {
            case "homePage":
              postData.LinkGenreId.push(1);
              postData.Url.push(x.value);
              break;
            case "blog":
              postData.LinkGenreId.push(2);
              postData.Url.push(x.value);
              break;
            case "twitter":
              postData.LinkGenreId.push(3);
              postData.Url.push(x.value);
              break;
            case "facebook":
              postData.LinkGenreId.push(4);
              postData.Url.push(x.value);
              break;
            case "instagram":
              postData.LinkGenreId.push(5);
              postData.Url.push(x.value);
              break;
          }
        }
      });

      // 都道府県・市区町村・町名・建物名から住所を生成
      var prefecture = this.formList.prefecture.options.find(
        (y) => y.id == this.formList.prefecture.value
      ).name;
      postData.Address =
        prefecture +
        this.formList.city.value +
        this.formList.town.value +
        this.formList.buildingName.value;

      // 住所に基づいて緯度経度を取得
      getCoord(postData.Address).then((res) => {
        var coord = res.results[0].geometry.location;
        postData.Latitude = coord.lat;
        postData.Longitude = coord.lng;
        var stations = [];
        // 全駅リストを取得
        getStation("").then((res) => {
          // 各駅について店舗からの距離を計算
          res.forEach((station) => {
            station.distance = getGeoDistance(
              coord.lat,
              coord.lng,
              station.latitude,
              station.longitude,
              0
            );
            stations.push(station);
          });

          // 全駅リストを店舗からの距離順に並び替え
          stations = Enumerable.from(stations)
            .select((x) => x)
            .orderBy((x) => x.distance)
            .toArray();

          // 最も店舗から近い駅が800m以上離れている場合、上位1件のみを取得
          if (stations[0].distance > 800) {
            stations = stations.slice(0, 1);
          } else {
            // 800m以内に複数駅存在する場合、上位5件を取得
            stations = Enumerable.from(stations)
              .where((x) => x.distance <= 800)
              .take(5)
              .toArray();
          }

          // 店舗から最も近い駅を最寄り駅IDとする
          postData.StationId = stations[0].id;

          // 最寄駅から店舗までの距離が500m以内の場合、「駅から近い」タグを付与
          if (stations[0].distance <= 500) {
            postData.TagId.unshift(11);
          }

          // 最寄駅からの徒歩移動時間を計算
          var accessArr = [];
          var stationCoordArr = stations.map((x) => {
            return `${x.latitude},${x.longitude}`;
          });
          this.getRangeFromNearestStation(
            stationCoordArr,
            postData.Address
          ).then((res) => {
            res.rows.forEach((x, index) => {
              accessArr.push(
                stations[index].name +
                  "駅から徒歩" +
                  x.elements[0].duration.text
              );
            });
            // postData.Access = accessArr.join(" ");

            // 店舗追加処理
            addRestaurant(postData)
              .then(() => {
                this.$router.push("/RestaurantRegistration/Complete");
              })
              .catch((err) => {
                this.$router.push({
                  name: "NotFound",
                  params: { errorMessage: err },
                });
              });
          });
        });
      });
    },
    makeToast(variant, message) {
      this.$bvToast.toast(message, {
        title: "注意！",
        variant: variant,
        solid: true,
      });
    },
  },
  watch: {
    "formList.prefecture.value"(value) {
      if (value != null) {
        this.fetchCity(value);
      } else {
        this.formList.city.options = [];
        this.formList.city.disabled = true;
        this.formList.city.placeholder = "都道府県を選択してください";
      }
      this.formList.city.value = "";
    },
    "formList.city.value"(value) {
      if (value != "") {
        this.fetchTown(value);
      } else {
        this.formList.town.options = [];
        this.formList.town.disabled = true;
        this.formList.town.placeholder = "市区町村を入力してください";
      }
      this.formList.town.value = "";
    },
    "formList.town.value"(value) {
      if (value != "") {
        this.formList.buildingName.disabled = false;
        this.formList.buildingName.placeholder =
          "建物名・階数を入力してください";
      } else {
        this.formList.buildingName.disabled = true;
        this.formList.buildingName.placeholder = "町名を入力してください";
      }
      this.formList.buildingName.value = "";
    },
  },
};
</script>

<style scoped>
.wrapper {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 0.9em;
}

.resultTable {
  width: 90%;
  margin: 0 auto;
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