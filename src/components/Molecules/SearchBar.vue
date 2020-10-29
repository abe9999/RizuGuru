<template>
  <header class="wrapper">
    <InputFormForSearch
      class="top-item"
      :message="buttonMessage"
      :action="buttonAction"
      :getter="getter"
      :setter="setter"
      :searchButtonAction="searchButtonAction"
    />
    <section class="bottom-item">
      <b-button
        class="bottom-item-button"
        variant="success"
        @click="searchButtonAction"
        ><b-icon icon="search" />
        <span class="button-message">検索</span>
      </b-button>
      <b-button class="bottom-item-button" @click="buttonAction"
        ><b-icon icon="filter-left" />
        <span class="button-message">絞り込む</span>
      </b-button>
    </section>
    <section class="keyword-list-wrapper">
      <ul class="keyword-list">
        <li v-if="keyword" @click="searchKeywordTagAction('keyword')">
          {{ keyword }}
          <b-icon icon="x" />
        </li>
        <li v-if="station" @click="searchKeywordTagAction('station')">
          {{ station }}駅
          <b-icon icon="x" />
        </li>
        <li v-if="genre" @click="searchKeywordTagAction('genre')">
          {{ genre }}
          <b-icon icon="x" />
        </li>
        <li v-if="distance" @click="searchKeywordTagAction('distance')">
          現在地から{{ distance }}以内
          <b-icon icon="x" />
        </li>
        <li
          v-if="!(price.minPrice == 0 && price.maxPrice == 1000)"
          @click="searchKeywordTagAction('price')"
        >
          {{ `￥${price.minPrice}～￥${price.maxPrice}` }}
          <b-icon icon="x" />
        </li>
        <li
          v-for="tag in tags"
          :key="tag.id"
          @click="searchKeywordTagAction('tag', tag.id)"
        >
          {{ `${tag.tagContent}` }}
          <b-icon icon="x" />
        </li>
      </ul>
    </section>
  </header>
</template>

<script>
import { getTagsList } from "@/plugins/getTagsList.js";
import InputFormForSearch from "@/components/Atoms/InputFormForSearch.vue";
export default {
  components: {
    InputFormForSearch,
  },
  props: {
    buttonAction: Function,
    buttonMessage: String,
    getter: Function,
    setter: Function,
    searchButtonAction: Function,
    searchQuery: Object,
    searchKeywordTagAction: Function,
  },
  data() {
    return {
      keyword: "",
      station: "",
      genre: "",
      distance: null,
      price: {
        maxPrice: null,
        minPrice: null,
      },
      tags: [],
    };
  },
  mounted() {
    Object.entries(this.searchQuery)
      .map(([key, value]) => ({
        key,
        value,
      }))
      .filter((x) => x.value !== "")
      .forEach((query) => {
        switch (query.key) {
          case "keyword":
          case "station":
          case "genre":
            this[query.key] = query.value;
            break;
          case "distance":
            query.value =
              query.value <= 1000
                ? `${query.value}m`
                : `${query.value / 1000}km`;
            this[query.key] = query.value;
            break;
          case "minPrice":
          case "maxPrice":
            this.price[query.key] = query.value;
            break;
          case "tagsId":
            getTagsList().then((res) => {
              if (query.value != "") {
                query.value = query.value.split(",").map((tagId) => ({
                  id: res.find((x) => x.id == tagId).id,
                  tagContent: res.find((x) => x.id == tagId).tagContent,
                }));
                this.tags.push(...query.value);
              }
            });
            break;
        }
      });
  },
};
</script>

<style scoped>
.wrapper {
  padding-bottom: 5px;
}

.top-item {
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 5px;
  width: 80%;
}

.bottom-item {
  display: none;
}

.bottom-item-button {
  width: 49%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.button-message {
  margin-left: 5px;
}

.keyword-list {
  overflow-x: scroll;
  white-space: nowrap;
  list-style: none;
  display: flex;
  margin: 0;
  padding: 5px 0;
}

.keyword-list::-webkit-scrollbar {
  overflow: hidden;
}

.keyword-list::-webkit-scrollbar:horizontal {
  height: 10px;
}

.keyword-list::-webkit-scrollbar-thumb {
  overflow: hidden;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  background: #777777e5;
}

.keyword-list li {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 15px;
  padding-left: 5px;
  padding-right: 5px;
  color: white;
  background-color: #689e39;
  border-radius: 5px;
  cursor: pointer;
}

.keyword-list li:hover {
  opacity: 0.7;
}

@media (max-width: 767px) {
  .top-item {
    width: 100%;
  }

  .bottom-item {
    display: flex;
    justify-content: space-around;
  }

  .keyword-list::-webkit-scrollbar {
    display: none;
  }
}
</style>