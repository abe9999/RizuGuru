 <template>
  <div>
    <div v-for="(link, key) in links" :key="key">
      <RegistrationItem :name="link.name" :example="link.url" />
    </div>
  </div>
</template>

<script>
import RegistrationItem from "@/components/RestaurantRegistration/RegistrationItem.vue";

export default {
  data() {
    return {
      links: [
        {
          name: "ホームページ",
          url: "https://rizuguru.jp/",
        },
        {
          name: "Twitter",
          url: "https://twitter.com/rizuguru",
        },
        {
          name: "Facebook",
          url: "https://www.facebook.com/rizuguru",
        },
        {
          name: "Instagram",
          url: "https://instagram.com/rizuguru",
        },
      ],
    };
  },
  components: {
    RegistrationItem,
  },
};
</script>