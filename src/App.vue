<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item class="title">
          Vuejs Clipper
        </v-list-item>
        <v-list-item link>Quick Start</v-list-item>
        <v-list-item link to="/basic">Clipper Basic</v-list-item>
        <v-list-item link>Clipper Fixed</v-list-item>
        <!-- <v-list-item link>
          <v-list-group></v-list-group>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/">Vuejs Clipper</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/timtnleeProject/vuejs-clipper" target="_blank" text>
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false
  })
};
</script>

<style lang="scss">
.label--text {
  color: rgba(255, 255, 255, 0.7);
}
</style>
