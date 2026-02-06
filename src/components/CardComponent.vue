<script setup>
  import { useRoute } from "vue-router";

  const props = defineProps({
      object: {
        type: Object,
        required: true,
      }
    });
  const route = useRoute();

</script>

<template>
  <div v-if="route.name === 'alumni'" class="card-alumni border">
    <div class="photo">
      <img :src="props.object.photo_url" alt="">
    </div>
    <div class="text">
      <h4>{{ props.object.first_name }} {{ props.object.last_name }}</h4>
      <h5>{{ props.object.graduate_profile.place_of_work }}</h5>
      <h6>{{ props.object.graduate_profile.year_of_graduation }} жылғы түлек</h6>
    </div>
    <router-link
      :to="{name: 'person', params: { id: props.object.id }}"
      class="btn-card"
    >Толығырақ</router-link>
  </div>
  <div v-else-if="route.name=== 'reports'" class="card-report border">
    <div class="report">
      <h3>{{ props.object.title }}</h3>
      <h4>Автор: {{props.object.author.first_name}} {{  props.object.author.last_name}}</h4>
      <p>{{ props.object.description }}</p>
      <h5>Шыққан күні: {{ props.object.updated_at}}</h5>
    </div>
    <router-link
      :to="{name: 'report', params: { id: props.object.id }}"
      class="btn-card"
    >Толығырақ</router-link>
  </div>
  <div v-else-if="route.name=== 'ideas'" class="card-idea border">
    <div class="idea">
      <h3>{{ props.object.title }}</h3>
      <h4><span>Автор:</span> {{props.object.author_id}}</h4>
      <h5><span>Дедлайн:</span> {{ props.object.deadline}}</h5>
      <p>{{ props.object.description }}</p>
    </div>
    <div class="footer">
      <div class="vote">
        <ul>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              class="main"
              d="M9.79375 1.0284C10.6062 1.1909 11.1344 1.98152 10.9719 2.79402L10.9 3.15027C10.7344 3.98465 10.4281 4.7784 10 5.50027H14.5C15.3281 5.50027 16 6.17215 16 7.00027C16 7.5784 15.6719 8.08152 15.1906 8.33152C15.5312 8.60652 15.75 9.0284 15.75 9.50027C15.75 10.2315 15.225 10.8409 14.5344 10.9721C14.6719 11.2003 14.75 11.4659 14.75 11.7503C14.75 12.4159 14.3156 12.9815 13.7156 13.1753C13.7375 13.2784 13.75 13.3878 13.75 13.5003C13.75 14.3284 13.0781 15.0003 12.25 15.0003H9.20312C8.60938 15.0003 8.03125 14.8253 7.5375 14.4971L6.33437 13.694C5.5 13.1378 5 12.2003 5 11.1971V10.0003V8.50027V7.72215C5 6.80965 5.41563 5.95027 6.125 5.3784L6.35625 5.19402C7.18437 4.53152 7.75 3.60027 7.95625 2.56277L8.02812 2.20652C8.19063 1.39402 8.98125 0.865898 9.79375 1.0284ZM1 6.00027H3C3.55312 6.00027 4 6.44715 4 7.00027V14.0003C4 14.5534 3.55312 15.0003 3 15.0003H1C0.446875 15.0003 0 14.5534 0 14.0003V7.00027C0 6.44715 0.446875 6.00027 1 6.00027Z" fill="#374151"/>
            </svg>
            <span>Қолдаймын</span>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                 fill="none">
            <g clip-path="url(#clip0_2_5101)">
              <path
                class="main"
                d="M10.4344 14.9719C11.2469 14.8094 11.775 14.0188 11.6125 13.2063L11.5406 12.85C11.375 12.0156 11.0688 11.2219 10.6406 10.5H15.1406C15.9688 10.5 16.6406 9.82812 16.6406 9C16.6406 8.42188 16.3125 7.91875 15.8313 7.66875C16.1719 7.39375 16.3906 6.97188 16.3906 6.5C16.3906 5.76875 15.8656 5.15937 15.175 5.02812C15.3125 4.8 15.3906 4.53437 15.3906 4.25C15.3906 3.58437 14.9563 3.01875 14.3562 2.825C14.3781 2.72188 14.3906 2.6125 14.3906 2.5C14.3906 1.67188 13.7188 1 12.8906 1H9.84375C9.25 1 8.67188 1.175 8.17812 1.50312L6.975 2.30625C6.14062 2.8625 5.64062 3.8 5.64062 4.80312V6V7.5V8.27812C5.64062 9.19063 6.05625 10.05 6.76562 10.6219L6.99687 10.8062C7.825 11.4688 8.39062 12.4 8.59688 13.4375L8.66875 13.7937C8.83125 14.6062 9.62187 15.1344 10.4344 14.9719ZM1.64062 12H3.64062C4.19375 12 4.64062 11.5531 4.64062 11V4C4.64062 3.44688 4.19375 3 3.64062 3H1.64062C1.0875 3 0.640625 3.44688 0.640625 4V11C0.640625 11.5531 1.0875 12 1.64062 12Z" fill="#374151"/>
            </g>
            </svg>
            <span>Қолдамаймын</span>
          </li>
        </ul>
      </div>
      <router-link
        :to="{name: 'idea', params: { id: props.object.id }}"
        class="btn-card"
      >Толығырақ</router-link>
    </div>
  </div>
  <div v-else-if="route.name=== 'projects'" class="card-idea project border">
    <div class="idea">
      <h3>{{ props.object.title }}</h3>
      <h4><span>Автор:</span> {{props.object.author_id }}</h4>
      <h5><span>Шыққан күні:</span> {{ props.object.deadline}}</h5>
      <p>{{ props.object.description }}</p>
      <div class="budget">

      </div>
    </div>
    <div class="footer">
      <router-link
        :to="{name: 'project', params: { id: props.object.id }}"
        class="btn-card"
      >Толығырақ</router-link>
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use "../assets/styles/card"
</style>
