  app = angular.module('helloworld', ['ui.router'])
      .config(function($stateProvider) {
          $stateProvider.state({
            name: 'hello',
            url: '/hello',
            templateUrl: './pages/hello/hello.html',
            controller: 'HelloController'
          })
          .state({
              name:'hello.choice0',
              url:'/choice0',
              templateUrl: './pages/choices/choice0.html',
              controller: 'Choice0Controller'
          })
          .state({
              name:'hello.choice1',
              url:'/choice1',
              templateUrl: './pages/choices/choice1.html',
              controller: 'Choice1Controller'
          })
          .state({
              name:'hello.choice2',
              url:'/choice2',
              views:{
                '':{
                  templateUrl: './pages/choices/choice2.html',
                  controller: 'Choice2Controller',
                },
                'ctrlPanel@hello.choice2':{
                  templateUrl: './pages/choices/ctrlpanel/ctrlpanel.html',
                  controller: 'CtrlPanel@Choice2Controller'
                },
                'table@hello.choice2':{
                  templateUrl: './pages/choices/table/table.html',
                  controller: 'Table@Choice2Controller'
                }
              }
          })
          .state({
              name:'hello.choice3',
              url:'/choice3',
              templateUrl: './pages/choices/choice3.html',
              controller: 'Choice3Controller'
          })
          .state({
              name:'hello.choice4',
              url:'/choice4',
              templateUrl: './pages/choices/choice4.html',
              controller: 'Choice4Controller'
          })
          .state({
              name:'hello.choice5',
              url:'/choice5',
              templateUrl: './pages/choices/choice5.html',
              controller: 'Choice5Controller'
          })
          .state({
            name: 'about',
            url: '/about',
            templateUrl: './pages/about/about.html',
            controller: 'AboutController'
          })
          .state({
            name: 'react',
            url: '/react',
            templateUrl: './pages/react/react.html',
            controller: 'ReactController'
          });
      });