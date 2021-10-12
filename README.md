# How to test DevExtreme components in JavaScript/jQuery

A good article describing the testing basics https://medium.com/welldone-software/an-overview-of-javascript-testing-7ce7298b9870

The most used test types for web applications are the following:

**Unit Tests**
Testing of particular code parts (units), that implement a simple feature. A unit can be a function or class. A component is created and then we should make sure that the required unit works as expected. 
Unit testing helps to organize the code in isolated pieces, that can be tested separately. Each test should cover only a single unit of code. This allows a developer to make sure that everything works as expected after implementing new functionality and to easily find a problematic part (if any).

Unit testing helps improving the design of the code and also to find complex units that can be simplified.

**Integration Tests**
Testing processes across several units to achieve their goals, including their side effects

**End-to-end Tests** (e2e tests or functional tests)
Testing how scenarios function on the product itself, by controlling the browser or the website. These tests usually ignore the internal structure of the application entirety and look at them from the eyes of the user like on a black box.

Besides these main test types, you can use any other tests to make sure that your application works as expected. For instance, **Screenshot Tests** is a simple way to verify your application's appearance. We ship `[TestCafe Studio](https://www.devexpress.com/products/testcafestudio/)`. It can help you with End-to-End tests including screenshot tests.

**Examples**

**Testing in jQuery**:

**Unit tests with QUnit**
Let's create a unit test for DataGrid. There, we'll check that DataGrid is created and displaying data
To get started with QUnit in the browser, create a simple HTML file called test.html and include the following markup:
```
<meta charset="utf-8" />
<title>Test DataGrid</title>
<head>
  <script src="https://code.jquery.com/qunit/qunit-2.16.0.js"></script>
  <script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous"
  ></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/devextreme/21.1.4/js/dx.all.js"></script>
  <link
    rel="stylesheet"
    href="https://code.jquery.com/qunit/qunit-2.16.0.css"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/devextreme/21.1.4/css/dx.light.css"
    rel="stylesheet"
  />
</head>
<body>
  <div id="dataGrid"></div>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
</body>
```
That’s all the markup you need to start writing tests. Note that this loads jQuery, QUnit, and DevExtreme libraries from CDN.

Add the following script, which tests that DataGrid is configured and loaded data. In this script, we create a DataGrid instance and measure the number of data rows after the datagrid is displayed.
```
<script>
  let createDataGrid = (options, $container) => {
    const dataGridElement = ($container || $("#dataGrid")).dxDataGrid(options);
    QUnit.assert.ok(dataGridElement);
    const dataGrid = dataGridElement.dxDataGrid("instance");
    return dataGrid;
  };

  QUnit.module("DataGrid", function () {
    QUnit.test("DataGrid is ready and displaying data", function (assert) {
      // act
      const dataGrid = createDataGrid({
        dataSource: {
          pageSize: 3,
          store: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        },
      });

      // assert
      assert.equal($("#dataGrid").find(".dx-data-row").length, 3);
    });
  });
</script>
```
Open the `test.html` file in a browser to see the detailed report of the test and its result. If you have multiple tests in one file, you can filter the results or re-run particular tests.

You can find the full code in the following folder: /jQuery/Unit tests/QUnit in the Browser


**Integration tests with QUnit**

Let's create an integration test for DataGrid. In this test, we add a row programmativally and save it. Then, we'll check the result.
To get started with QUnit in the browser, create a simple HTML file called test.html as shown in the previous section. Reference the [SinonJS](https://sinonjs.org/how-to/) script on the page:
```
<script src="https://cdn.jsdelivr.net/npm/sinon@9/pkg/sinon.js"></script>
```
It is helpful to create fake timers.

Add the following script:
```
<script>
let clock;

  let createDataGrid = (options, $container) => {
    const dataGridElement = ($container || $("#dataGrid")).dxDataGrid(options);
    QUnit.assert.ok(dataGridElement, "DataGrid created");
    const dataGrid = dataGridElement.dxDataGrid("instance");
    return dataGrid;
  };

  QUnit.module("DataGrid", {
    beforeEach: function() {
        clock = sinon.useFakeTimers();
    },
    afterEach: function() {
        clock.restore();
    }
}, () => {
    QUnit.test('Add a row in batch edit mode', function(assert) {
        // arrange, act
        const array = [{ id: 1, name: 'Test 1' }];

        const dataGrid = createDataGrid({
            editing: {
                mode: 'batch'
            },
            dataSource: {
                key: 'id',
                load: function() {
                    return array;
                },
                insert: function(values) {
                    array.push(values);
                }
            }
        });

        clock.tick(100);

        // act
        dataGrid.addRow();

        clock.tick(100);

        dataGrid.saveEditData();

        clock.tick(200);

        // assert
        assert.strictEqual(dataGrid.getVisibleRows().length, 2, 'visible rows: 2');
        assert.strictEqual(dataGrid.hasEditData(), false, 'DataGrid has no edit data');
    });
  });
</script>
```

After DataGrid is created, we call the addRow and saveEditData methods. Since all the processes are async, we have to use fake timers to perform methods continually. After that we check that DataGrid has two visible rows - one initial and the second is new one.

Open the `test.html` file in a browser to see the detailed report of the test and its result.

You can find the full code in the following folder: /jQuery/Integration tests/QUnit in the Browser


**End-to-end tests with QUnit**


Let's create an end-to-end test for DataGrid. There, we'll switch its page by emulating a click on a pager.
To get started with, create a simple HTML file called test.html and include the following markup:

```
<!DOCTYPE html>
<meta charset="utf-8" />
<title>Test DataGrid</title>
<head>
  <script src="https://code.jquery.com/qunit/qunit-2.16.0.js"></script>
  <script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous"
  ></script>
  <script src="https://cdn.jsdelivr.net/npm/sinon@9/pkg/sinon.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/devextreme/21.1.4/js/dx.all.js"></script>
  <link
    rel="stylesheet"
    href="https://code.jquery.com/qunit/qunit-2.16.0.css"
  />
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/devextreme/21.1.4/css/dx.light.css"
    rel="stylesheet"
  />
</head>
<body>
  <div id="dataGrid"></div>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
</body>
```

Add the following script:

```
<script>
  let clock;
  const testElement = $('#dataGrid');

  let createDataGrid = (options, $container) => {
    const dataGridElement = ($container || $("#dataGrid")).dxDataGrid(options);
    QUnit.assert.ok(dataGridElement, "DataGrid created");
    const dataGrid = dataGridElement.dxDataGrid("instance");
    return dataGrid;
  };

  QUnit.module("DataGrid", {
    beforeEach: function() {
        clock = sinon.useFakeTimers();
    },
    afterEach: function() {
        clock.restore();
    }
}, () => {
    QUnit.test('Page index is changed from dxPager', function(assert) {
        // arrange, act

        const array = [];
        for (let i = 0; i < 100; i++) {
          array.push({id: i, test: 'test ' + i})
        }

        const dataGrid = createDataGrid({
            dataSource: {
                key: 'id',
                load: function() {
                    return array;
                }
            },
            pager: {
                enabled: true,
                visible: true,
                allowedPageSizes: [5, 10],
                showPageSizeSelector: true
            },
            paging: {
                enabled: true,
                pageSize: 10
            }
        });

        clock.tick(100);

        // act
        $(testElement.find('.dx-page')[5]).trigger('dxclick');

        clock.tick(300);

        // assert
        assert.equal(dataGrid.pageIndex(), 5, 'page index');
    });
  });
</script>
```

In this script, we configure DataGrid, including its pager and paging properties. Next, we find a page button on a pager and trigger the "dxclick" event on it. The result is OK if the page index is changed.

You can find the full code in the following folder: /jQuery/End-to-end tests/QUnit in the Browser