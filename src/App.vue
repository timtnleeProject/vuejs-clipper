<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <template v-for="group in groups">
          <v-subheader :key="group.name + 'name'">{{ group.name }}</v-subheader>
          <v-list-item
            v-for="link in group.links"
            :key="link.name + 'link'"
            link
            :to="link.to"
            dense
            ><v-list-item-content>
              <v-list-item-title>
                {{ link.name }}
              </v-list-item-title>
            </v-list-item-content></v-list-item
          >
        </template>
        <!-- 
        <v-list-group no-action :ripple="false">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Playground</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item link to="/basic">Clipper Basic</v-list-item>
          <v-list-item link to="/fixed">Clipper Fixed</v-list-item>
        </v-list-group> -->
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
    drawer: false,
    groups: [
      {
        name: "Introduction",
        links: [
          {
            name: "Features",
            to: "/introduction/features"
          },
          {
            name: "Concept",
            to: "/introduction/concept"
          }
        ]
      },
      {
        name: "Getting Start",
        links: [
          {
            name: "Installation",
            to: "/installation"
          },
          {
            name: "Basic Usage",
            to: "/start"
          }
        ]
      },
      {
        name: "Playground",
        links: [
          {
            name: "Clipper Basic",
            to: "/playground/basic"
          },
          {
            name: "Clipper Fixed",
            to: "/playground/fixed"
          }
        ]
      },
      {
        name: "Examples",
        links: [
          {
            name: "Transparent Image",
            to: "/examples/transpaent-image"
          },
          {
            name: "Vertical Image",
            to: "/examples/vertical-image"
          }
        ]
      }
    ]
  })
};
</script>

<style lang="scss">
.label--text {
  color: rgba(255, 255, 255, 0.7);
}
</style>
