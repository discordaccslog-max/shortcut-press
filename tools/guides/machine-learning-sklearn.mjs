import { k, notebook } from "./_helpers.mjs";
import { housesCsv, churnCsv } from "./_ml-data.mjs";

const COMPLETED = [
  ["markdown", "# Machine learning foundations\nCompleted notebook for the Shortcut Press guide. Run the cells from top to bottom; results match the guide because every split uses `random_state=42`."],
  ["code", "import pandas as pd\nfrom sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV\nfrom sklearn.linear_model import LinearRegression, LogisticRegression\nfrom sklearn.metrics import mean_absolute_error, r2_score, accuracy_score, confusion_matrix, precision_score, recall_score\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\nimport joblib"],
  ["markdown", "## Lessons 2–3: house prices"],
  ["code", "houses = pd.read_csv(\"houses.csv\")\nhouses.describe()"],
  ["code", "houses.select_dtypes(\"number\").corr()[\"price_k\"].round(2)"],
  ["code", "num = [\"size_m2\", \"bedrooms\", \"age_years\", \"distance_km\"]\nX = houses[num]\ny = houses[\"price_k\"]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)\nmodel = LinearRegression().fit(X_train, y_train)\npred = model.predict(X_test)\nprint(\"MAE:\", round(mean_absolute_error(y_test, pred), 2), \" R2:\", round(r2_score(y_test, pred), 3))\ndict(zip(num, model.coef_.round(2)))"],
  ["markdown", "## Lesson 4: churn"],
  ["code", "churn = pd.read_csv(\"churn.csv\")\nXc = churn.drop(columns=\"churned\")\nyc = churn[\"churned\"]\nXc_train, Xc_test, yc_train, yc_test = train_test_split(Xc, yc, test_size=0.25, random_state=42, stratify=yc)\nnum_c = [\"tenure_months\", \"monthly_fee\", \"support_calls\"]\nlog = LogisticRegression(max_iter=1000).fit(Xc_train[num_c], yc_train)\npc = log.predict(Xc_test[num_c])\nprint(accuracy_score(yc_test, pc))\nconfusion_matrix(yc_test, pc)"],
  ["markdown", "## Lesson 5: a pipeline"],
  ["code", "prep = ColumnTransformer([\n    (\"num\", StandardScaler(), num_c),\n    (\"cat\", OneHotEncoder(handle_unknown=\"ignore\"), [\"plan\", \"auto_pay\"]),\n])\npipe = Pipeline([(\"prep\", prep), (\"model\", LogisticRegression(max_iter=1000))])\npipe.fit(Xc_train, yc_train)\npc2 = pipe.predict(Xc_test)\nprint(accuracy_score(yc_test, pc2), precision_score(yc_test, pc2), recall_score(yc_test, pc2))"],
  ["markdown", "## Lesson 6: trees and forests"],
  ["code", "Xd = pd.get_dummies(Xc, columns=[\"plan\", \"auto_pay\"])\nXd_train, Xd_test, yd_train, yd_test = train_test_split(Xd, yc, test_size=0.25, random_state=42, stratify=yc)\ntree = DecisionTreeClassifier(max_depth=3, random_state=42).fit(Xd_train, yd_train)\nprint(\"depth 3:\", tree.score(Xd_train, yd_train), tree.score(Xd_test, yd_test))\nforest = RandomForestClassifier(n_estimators=200, random_state=42).fit(Xd_train, yd_train)\nprint(\"forest:\", forest.score(Xd_test, yd_test))\npd.Series(forest.feature_importances_, index=Xd.columns).sort_values(ascending=False).round(3)"],
  ["markdown", "## Lesson 7: validation and tuning"],
  ["code", "scores = cross_val_score(DecisionTreeClassifier(max_depth=3, random_state=42), Xd_train, yd_train, cv=5)\nprint(scores.round(3), scores.mean().round(3))\ngrid = GridSearchCV(DecisionTreeClassifier(random_state=42), {\"max_depth\": [2, 3, 4, 5, 6, None]}, cv=5).fit(Xd_train, yd_train)\nprint(grid.best_params_, round(grid.best_score_, 3), grid.score(Xd_test, yd_test))"],
  ["markdown", "## Lesson 8: save and use the model"],
  ["code", "joblib.dump(pipe, \"churn_model.joblib\")\nloaded = joblib.load(\"churn_model.joblib\")\nnew = pd.DataFrame([[3, 55.0, 4, \"Pro\", \"no\"], [48, 15.0, 0, \"Basic\", \"yes\"]], columns=Xc.columns)\nloaded.predict_proba(new)[:, 1].round(3)"],
];
const STARTER = [
  ["markdown", "# Machine learning foundations\nStarter notebook. Each heading matches a lesson in the guide."],
  ["code", "import pandas as pd"],
  ...["Lessons 2–3: house prices", "Lesson 4: churn", "Lesson 5: a pipeline", "Lesson 6: trees and forests", "Lesson 7: validation and tuning", "Lesson 8: save and use the model"].flatMap((h) => [["markdown", "## " + h], ["code", ""]]),
];

export default {
  id: "machine-learning-sklearn",
  slug: "machine-learning-sklearn",
  title: "Machine Learning Foundations with scikit-learn",
  software: "Python, pandas, scikit-learn and Jupyter",
  apps: ["Jupyter", "VS Code"],
  intro:
    "Learn how machine learning works by building models yourself with scikit-learn: predicting house prices with regression, predicting customer churn with classification, preprocessing with pipelines, decision trees and random forests, cross-validation and tuning, and saving a model responsibly. Every number in the guide comes from the practice data with fixed random seeds, so your results match.",
  platformNote: "Shortcuts are shown for Jupyter notebooks in VS Code or JupyterLab on Windows and Linux. On a Mac, use Cmd in place of Ctrl.",
  store: {
    category: "code",
    level: "Intermediate",
    software: "Python 3 with pandas, scikit-learn and Jupyter (all free)",
    softwareShort: "Python + scikit-learn",
    softwareHtml: `<p>This guide uses <strong>Python 3</strong> with <strong>pandas</strong> and <strong>scikit-learn</strong> in a <strong>Jupyter</strong> notebook (in Visual Studio Code or JupyterLab). All are free and obtained separately: Python from python.org, then <code>pip install pandas scikit-learn notebook joblib</code>. None of the software is included with the guide. Written for scikit-learn 1.3 and later.</p>`,
    forWho: [
      "You can work with pandas DataFrames and want to understand and build predictive models.",
      "You've read about machine learning and want to see each step for yourself, with real numbers.",
      "You need to judge whether a model is any good, not just run one.",
    ],
    notFor: [
      "You're new to Python or pandas. Start with Data Analysis with Python & pandas.",
      "You want deep learning, neural networks or large language models. The guide covers classic machine learning.",
      "You want video lessons, live help, or someone to review your work.",
    ],
  },
  files: [
    { name: "houses.csv", title: "House prices", desc: "240 homes with size, bedrooms, age, distance to the center, neighborhood and price (in thousands)." },
    { name: "churn.csv", title: "Customer churn", desc: "400 subscription customers with tenure, fee, support calls, plan, auto-pay and whether they left." },
    { name: "ml-starter.ipynb", title: "Starter notebook", desc: "One heading per lesson with empty cells to fill in." },
    { name: "ml-completed.ipynb", title: "Completed notebook", desc: "Every model from the guide, with the same random seeds, so the numbers match." },
  ],
  shortcuts: [
    { keys: "Shift+Enter", action: "Run the cell and move to the next one", app: "Jupyter" },
    { keys: "Ctrl+Enter", action: "Run the cell and stay on it", app: "Jupyter" },
    { keys: "Alt+Enter", action: "Run the cell and insert one below", app: "Jupyter" },
    { keys: "A", action: "Insert a cell above (command mode)", app: "Jupyter" },
    { keys: "B", action: "Insert a cell below (command mode)", app: "Jupyter" },
    { keys: "M", action: "Change the cell to Markdown (command mode)", app: "Jupyter" },
    { keys: "Y", action: "Change the cell to code (command mode)", app: "Jupyter" },
    { keys: "Ctrl+S", action: "Save the notebook", app: "Jupyter" },
    { keys: "Ctrl+/", action: "Comment or uncomment lines", app: "Jupyter" },
    { keys: "Tab", action: "Complete a name", app: "Jupyter" },
  ],
  lessons: [
    {
      id: "workflow",
      title: "What machine learning is",
      summary: "See the workflow every model follows, the vocabulary (features, target, training, testing), and set up scikit-learn.",
      diagram: { type: "flow", nodes: ["Data", "Split train / test", "Fit on train", "Predict on test", "Evaluate"], highlight: 1, title: "The workflow behind every model in this guide" },
      steps: [
        {
          title: "Learning from examples",
          body: `<p>A machine learning model learns a pattern from examples where the answer is known, then applies it to new cases. The inputs are <strong>features</strong> (size, age, distance); the answer is the <strong>target</strong> (price). Predicting a number is <em>regression</em>; predicting a category, such as “will leave” or “will stay”, is <em>classification</em>.</p>`,
        },
        {
          title: "Train and test",
          body: `<p>A model can memorize its examples, so you never judge it on data it learned from. You split the data: the model <em>fits</em> (learns) on the training set and is <em>evaluated</em> on the test set it has never seen. Test performance is the honest estimate of how it will do on new data.</p>`,
        },
        {
          title: "scikit-learn's pattern",
          body: `<p>Every scikit-learn model works the same way: create it (<code>model = LinearRegression()</code>), fit it (<code>model.fit(X_train, y_train)</code>), predict (<code>model.predict(X_test)</code>). Learn the pattern once and every model in the library is familiar.</p>`,
        },
        {
          title: "Set up",
          body: `<p>Run <code>pip install pandas scikit-learn notebook joblib</code> in a terminal, open <strong>ml-starter.ipynb</strong> in VS Code or JupyterLab with the practice CSVs in the same folder, and run the first cell with ${k("Shift", "Enter")}. If it runs without errors, you're ready.</p>`,
        },
      ],
      quiz: [
        { q: "Predicting whether a customer will leave (yes or no) is…", options: ["Regression", "Classification", "Clustering", "Cleaning"], answer: 1, explain: "The target is a category, so it's classification." },
        { q: "Why evaluate a model on a test set it hasn't seen?", options: ["It's faster", "A model can memorize training data, so only unseen data shows real performance", "The test set is bigger", "scikit-learn requires it"], answer: 1, explain: "Performance on unseen data estimates performance on new cases." },
      ],
      exercise: {
        title: "Name the parts",
        task: `<p>Open <strong>churn.csv</strong> in the notebook with <code>pd.read_csv</code>. Which column is the target? Which are features? Is predicting it regression or classification? What fraction of customers churned?</p>`,
        files: ["churn.csv", "ml-starter.ipynb"],
        solution: [
          "<code>churn = pd.read_csv(\"churn.csv\")</code> and <code>churn.head()</code>.",
          "The target is <strong>churned</strong> (1 = left, 0 = stayed); the five other columns are features.",
          "It's a category, so this is <strong>classification</strong>.",
          "<code>churn[\"churned\"].mean()</code> → <strong>0.44</strong>: 176 of 400 customers left.",
        ],
      },
    },
    {
      id: "explore",
      title: "Exploring data for modeling",
      summary: "Look at distributions and relationships before modeling, spot useful features with correlation, and check for problems.",
      diagram: { type: "bars", values: [95, 87, 6, 28], labels: ["size", "bedr.", "age", "dist."], highlight: 0, showValues: true, title: "Strength of each feature's correlation with price (×100)" },
      steps: [
        {
          title: "Summaries first",
          body: `<p><code>houses.describe()</code> shows each number column's range and average: prices run from about 87 to 556 thousand, with a mean of 306.4. <code>houses["neighborhood"].value_counts()</code> shows the three neighborhoods are roughly balanced (88, 81 and 71 homes).</p>`,
        },
        {
          title: "Correlation",
          body: `<p><code>houses.select_dtypes("number").corr()["price_k"]</code> measures how closely each feature moves with price, from −1 to 1. Size is very strong (0.95), bedrooms strong (0.87, partly because big homes have more bedrooms), distance weakly negative (−0.28) and age close to zero (−0.06).</p>`,
        },
        {
          title: "Correlation isn't everything",
          body: `<p>A weak correlation doesn't mean a feature is useless: age matters once size is accounted for, as the model in Lesson 3 shows. Correlation only measures straight-line relationships between two columns at a time. Use it to get your bearings, not to choose features alone.</p>`,
        },
        {
          title: "Check for problems",
          body: `<p><code>isna().sum()</code> should be zero for every column; models can't take missing values without help. Look for impossible values (negative sizes, a 300-year-old house), and for columns that wouldn't be known when you make a prediction, which would let the model cheat. More on that in Lesson 8.</p>`,
        },
      ],
      quiz: [
        { q: "Which feature has the strongest correlation with price?", options: ["bedrooms", "size_m2", "distance_km", "age_years"], answer: 1, explain: "Size: 0.95." },
        { q: "Age has a correlation of −0.06 with price. What can you conclude?", options: ["Age doesn't affect price", "There's no strong straight-line link on its own; it may still matter alongside other features", "Older homes cost more", "Age should be deleted"], answer: 1, explain: "Correlation looks at one pair at a time; the regression shows age lowers price once size is included." },
      ],
      exercise: {
        title: "Explore the houses",
        task: `<p>Load <strong>houses.csv</strong>, check for missing values, and list each number column's correlation with price. Which two features look most useful, and what's the average price?</p>`,
        files: ["houses.csv"],
        solution: [
          "<code>houses = pd.read_csv(\"houses.csv\")</code>; <code>houses.isna().sum()</code> is 0 everywhere.",
          "<code>houses.select_dtypes(\"number\").corr()[\"price_k\"].round(2)</code>",
          "<strong>size_m2 (0.95)</strong> and <strong>bedrooms (0.87)</strong>; distance −0.28; age −0.06.",
          "<code>houses[\"price_k\"].mean()</code> → about <strong>306.4</strong> thousand.",
        ],
      },
    },
    {
      id: "regression",
      title: "Your first model: linear regression",
      summary: "Split the data, fit a linear regression, measure its error, compare it with a simple baseline, and read its coefficients.",
      diagram: { type: "table", head: ["feature", "coefficient", "meaning"], rows: [["size_m2", "+2.09", "per square meter"], ["bedrooms", "+14.09", "per bedroom"], ["age_years", "−0.77", "per year of age"], ["distance_km", "−2.97", "per km from center"]], highlight: { cols: [1] }, caption: "Each coefficient: change in price (thousands) for one unit more" },
      steps: [
        {
          title: "Split",
          body: `<p><code>X = houses[["size_m2", "bedrooms", "age_years", "distance_km"]]</code> and <code>y = houses["price_k"]</code>. Then <code>train_test_split(X, y, test_size=0.25, random_state=42)</code> holds back a quarter for testing: 180 training homes and 60 test homes. <code>random_state=42</code> makes the split the same every time, so your numbers match the guide.</p>`,
        },
        {
          title: "Fit and predict",
          body: `<p><code>model = LinearRegression().fit(X_train, y_train)</code>, then <code>pred = model.predict(X_test)</code>. Linear regression finds the weighted sum of features that best matches the training prices.</p>`,
        },
        {
          title: "Measure the error",
          body: `<p><code>mean_absolute_error(y_test, pred)</code> is the average size of a miss: <strong>21.24</strong> thousand. <code>r2_score</code> is the share of price variation the model explains: <strong>0.955</strong>. For context, always predicting the training average would miss by 109.42 on average, so the model is about five times better.</p>`,
        },
        {
          title: "Read the coefficients",
          body: `<p><code>model.coef_</code> holds one weight per feature: each extra square meter adds about 2.09 thousand, each bedroom 14.09, each year of age takes off 0.77 and each kilometer from the center 2.97. That's one strength of linear models: you can explain them. Predict a 120 m², 3-bedroom, 10-year-old home 5 km out: about <strong>339.7</strong> thousand.</p>`,
        },
      ],
      quiz: [
        { q: "What does random_state=42 do in train_test_split?", options: ["Uses 42% of the data for testing", "Makes the random split repeatable", "Picks 42 rows", "Sets the model's accuracy"], answer: 1, explain: "A fixed seed gives the same split every run." },
        { q: "The model's MAE is 21.24 and the always-average baseline's is 109.42. What does that tell you?", options: ["The model is worse", "The model's typical miss is about a fifth of the baseline's", "MAE can't be compared", "The model is overfitting"], answer: 1, explain: "A baseline shows whether the model adds anything; here it clearly does." },
      ],
      exercise: {
        title: "Predict house prices",
        task: `<p>Fit a linear regression on the four number features with a 25% test split and <code>random_state=42</code>. Report the test MAE and R², then predict the price of a 120 m², 3-bedroom, 10-year-old home 5 km from the center.</p>`,
        files: ["houses.csv", "ml-completed.ipynb"],
        solution: [
          "Split with <code>train_test_split(X, y, test_size=0.25, random_state=42)</code>.",
          "<code>model = LinearRegression().fit(X_train, y_train)</code>; <code>pred = model.predict(X_test)</code>.",
          "MAE <strong>21.24</strong>, R² <strong>0.955</strong>.",
          "<code>model.predict(pd.DataFrame([[120, 3, 10, 5]], columns=X.columns))</code> → about <strong>339.7</strong> (thousand). Passing a DataFrame with the same column names avoids a warning.",
        ],
      },
    },
    {
      id: "classification",
      title: "Classification and its metrics",
      summary: "Predict churn with logistic regression, and judge it with accuracy, a baseline, the confusion matrix, precision and recall.",
      diagram: { type: "table", head: ["", "predicted stay", "predicted leave"], rows: [["actually stayed", "46", "10"], ["actually left", "16", "28"]], highlight: { rows: [1] }, caption: "Confusion matrix on 100 test customers (number features only)" },
      steps: [
        {
          title: "Stratified split",
          body: `<p>For classification, add <code>stratify=yc</code> to the split so training and test sets have the same share of churners (44% in both). Start with the three number features: <code>LogisticRegression(max_iter=1000).fit(Xc_train[num_c], yc_train)</code>.</p>`,
        },
        {
          title: "Accuracy and the baseline",
          body: `<p><code>accuracy_score</code> is the share of correct predictions: <strong>0.74</strong>. But 56% of test customers stayed, so a “model” that always predicts “stays” would score 0.56. Accuracy only means something next to that baseline.</p>`,
        },
        {
          title: "The confusion matrix",
          body: `<p><code>confusion_matrix(yc_test, pred)</code> splits the 100 test predictions into four cells: 46 stayed and were predicted to stay, 10 stayed but were flagged, 16 left but were missed, and 28 left and were caught. Which mistakes matter more depends on what you'll do with the predictions.</p>`,
        },
        {
          title: "Precision and recall",
          body: `<p><strong>Precision</strong>: of the customers flagged as leaving, how many did? 28 of 38 = 0.737. <strong>Recall</strong>: of those who left, how many were flagged? 28 of 44 = 0.636. If you'll call at-risk customers with an offer, recall (finding them) may matter more than precision.</p>`,
        },
      ],
      quiz: [
        { q: "Why compare accuracy with a baseline?", options: ["Accuracy is always wrong", "If one class is common, always guessing it already scores well", "Baselines are more accurate", "To speed up training"], answer: 1, explain: "56% of test customers stayed, so 0.56 is what guessing 'stays' achieves." },
        { q: "Of 44 customers who left, the model flagged 28. What is that?", options: ["Precision 0.636", "Recall 0.636", "Accuracy 0.636", "Specificity 0.636"], answer: 1, explain: "Recall is the share of actual positives that were found." },
      ],
      exercise: {
        title: "Predict churn",
        task: `<p>Split churn.csv (25% test, <code>random_state=42</code>, stratified), fit a logistic regression on tenure, fee and support calls, and report accuracy, the confusion matrix, precision and recall. Does it beat the always-stays baseline?</p>`,
        files: ["churn.csv"],
        solution: [
          "<code>Xc = churn.drop(columns=\"churned\")</code>, <code>yc = churn[\"churned\"]</code>; split with <code>stratify=yc</code>.",
          "<code>log = LogisticRegression(max_iter=1000).fit(Xc_train[num_c], yc_train)</code>; <code>pc = log.predict(Xc_test[num_c])</code>.",
          "Accuracy <strong>0.74</strong>; confusion matrix <code>[[46, 10], [16, 28]]</code>.",
          "Precision 0.737, recall 0.636. Yes: 0.74 beats the 0.56 baseline.",
        ],
      },
    },
    {
      id: "pipelines",
      title: "Preprocessing and pipelines",
      summary: "Scale number features, one-hot encode categories, and bundle preprocessing and model into one pipeline that can't leak test data.",
      diagram: { type: "flow", nodes: ["Raw columns", "Scale numbers", "One-hot categories", "Logistic regression", "Prediction"], highlight: 2, title: "A Pipeline runs every step in order, for fit and for predict" },
      steps: [
        {
          title: "Categories need encoding",
          body: `<p>Models need numbers. <code>OneHotEncoder</code> turns <em>plan</em> (Basic, Plus, Pro) into three 0/1 columns, one per value. <code>handle_unknown="ignore"</code> stops it failing if a new value appears later.</p>`,
        },
        {
          title: "Scaling",
          body: `<p>Tenure runs to 60 and support calls to 9. <code>StandardScaler</code> rescales each number column to mean 0 and standard deviation 1, which many models, including logistic regression, train better with.</p>`,
        },
        {
          title: "ColumnTransformer and Pipeline",
          body: `<p><code>ColumnTransformer</code> applies different steps to different columns: the scaler to the numbers, the encoder to plan and auto_pay. <code>Pipeline([("prep", prep), ("model", LogisticRegression(max_iter=1000))])</code> chains preprocessing and model, so <code>pipe.fit</code> and <code>pipe.predict</code> do everything in the right order.</p>`,
        },
        {
          title: "Why pipelines prevent leaks",
          body: `<p>Scaling uses averages. If you scaled the whole dataset before splitting, test data would influence training: a subtle leak that flatters results. In a pipeline, the scaler learns its averages from the training set only. With all five features, test accuracy rises to <strong>0.76</strong> and precision to 0.778.</p>`,
        },
      ],
      quiz: [
        { q: "What does OneHotEncoder do to a plan column with three values?", options: ["Numbers them 1, 2, 3", "Creates three 0/1 columns", "Deletes it", "Scales it"], answer: 1, explain: "One column per category, avoiding a false order between plans." },
        { q: "Why fit the scaler inside a pipeline rather than on all the data first?", options: ["It's faster", "So it learns only from training data and doesn't leak test information", "Scalers can't run alone", "To add categories"], answer: 1, explain: "Preprocessing must learn from training data only, like the model." },
      ],
      exercise: {
        title: "A churn pipeline",
        task: `<p>Build a pipeline that scales the three number features, one-hot encodes plan and auto_pay, and fits a logistic regression on the same split as Lesson 4. Report accuracy, precision and recall.</p>`,
        files: ["churn.csv", "ml-completed.ipynb"],
        solution: [
          '<code>prep = ColumnTransformer([("num", StandardScaler(), num_c), ("cat", OneHotEncoder(handle_unknown="ignore"), ["plan", "auto_pay"])])</code>',
          '<code>pipe = Pipeline([("prep", prep), ("model", LogisticRegression(max_iter=1000))]).fit(Xc_train, yc_train)</code>',
          "Accuracy <strong>0.76</strong>, precision <strong>0.778</strong>, recall 0.636; confusion matrix <code>[[48, 8], [16, 28]]</code>.",
          "The extra features mostly cut false alarms (8 instead of 10).",
        ],
      },
    },
    {
      id: "trees",
      title: "Decision trees and random forests",
      summary: "Fit decision trees, see overfitting happen as they grow, use a random forest, and read feature importances.",
      diagram: { type: "bars", values: [82, 69, 100, 63], labels: ["d3 train", "d3 test", "full train", "full test"], highlight: 3, showValues: true, title: "Accuracy (%): a fully grown tree memorizes the training data" },
      steps: [
        {
          title: "A decision tree",
          body: `<p>A tree asks yes/no questions (“tenure under 12 months?”) and splits until it reaches a prediction. Trees don't need scaling. Use <code>pd.get_dummies</code> for the categories, then <code>DecisionTreeClassifier(max_depth=3, random_state=42)</code>. Depth 3 scores 0.82 on training and 0.69 on test.</p>`,
        },
        {
          title: "Overfitting",
          body: `<p>Remove the depth limit and the tree grows 14 levels deep: training accuracy reaches <strong>1.00</strong> but test accuracy falls to <strong>0.63</strong>. It has memorized the training customers, including their noise. A big gap between training and test scores is the signature of overfitting.</p>`,
        },
        {
          title: "Random forests",
          body: `<p>A random forest trains many trees on random samples of rows and features and lets them vote. <code>RandomForestClassifier(n_estimators=200, random_state=42)</code> scores <strong>0.74</strong> on test, steadier than a single tree. Here the logistic pipeline (0.76) is still slightly better: simpler models often hold their own on small, tidy data.</p>`,
        },
        {
          title: "Feature importances",
          body: `<p><code>forest.feature_importances_</code> shows how much each feature contributed to the forest's splits: tenure 0.49, monthly fee 0.28, support calls 0.12, and small amounts for auto-pay and plan. Importances describe the model, not cause and effect.</p>`,
        },
      ],
      quiz: [
        { q: "A tree scores 1.00 on training and 0.63 on test. What's happening?", options: ["Underfitting", "Overfitting", "Data leakage", "A perfect model"], answer: 1, explain: "Perfect training and poor test performance means it memorized the training set." },
        { q: "Which feature matters most to the random forest?", options: ["monthly_fee", "support_calls", "tenure_months", "plan"], answer: 2, explain: "Tenure: importance 0.49." },
      ],
      exercise: {
        title: "Trees against forests",
        task: `<p>One-hot encode the churn features with <code>get_dummies</code>, split as before, and compare a depth-3 tree, an unlimited tree and a 200-tree forest on training and test accuracy. Which is best on test, and which overfits most?</p>`,
        files: ["churn.csv"],
        solution: [
          "<code>Xd = pd.get_dummies(Xc, columns=[\"plan\", \"auto_pay\"])</code>, then the same stratified split with <code>random_state=42</code>.",
          "Depth 3: train 0.82, test 0.69. Unlimited: train 1.00, test 0.63, depth 14: <strong>it overfits most</strong>.",
          "Forest: test <strong>0.74</strong>, the best of the three trees-based models.",
          "Importances: tenure 0.491, monthly_fee 0.280, support_calls 0.115.",
        ],
      },
    },
    {
      id: "validation",
      title: "Cross-validation and tuning",
      summary: "Get more reliable scores with cross-validation, tune settings with grid search, and keep the test set for the very end.",
      diagram: { type: "table", head: ["fold", "1", "2", "3", "4", "5"], rows: [["accuracy", "0.80", "0.77", "0.78", "0.77", "0.72"]], highlight: { cols: [5] }, caption: "5-fold cross-validation of a depth-3 tree: mean 0.767" },
      steps: [
        {
          title: "One split can mislead",
          body: `<p>A single test set of 100 customers is small; a different split could give a noticeably different score. <strong>Cross-validation</strong> splits the training data into 5 folds, trains on 4 and scores on the 5th, five times over, and averages the results.</p>`,
        },
        {
          title: "cross_val_score",
          body: `<p><code>cross_val_score(DecisionTreeClassifier(max_depth=3, random_state=42), Xd_train, yd_train, cv=5)</code> returns five scores, from 0.72 to 0.80, with a mean of <strong>0.767</strong>. The spread shows how much a single split can vary.</p>`,
        },
        {
          title: "GridSearchCV",
          body: `<p>Settings you choose, such as a tree's <code>max_depth</code>, are <em>hyperparameters</em>. <code>GridSearchCV(DecisionTreeClassifier(random_state=42), {"max_depth": [2, 3, 4, 5, 6, None]}, cv=5)</code> cross-validates every option. The best is depth 4, with a cross-validated accuracy of 0.773.</p>`,
        },
        {
          title: "The test set comes last",
          body: `<p>Tune using cross-validation on the training data only, then score the final choice on the test set once: the tuned tree gets 0.72. If you tune by repeatedly checking the test set, it stops being an honest estimate.</p>`,
        },
      ],
      quiz: [
        { q: "What does 5-fold cross-validation do?", options: ["Trains five different model types", "Trains and scores five times, each time holding out a different fifth", "Uses 5% of data for testing", "Repeats the test five times"], answer: 1, explain: "Each fold takes a turn as the validation set." },
        { q: "Why not choose max_depth by checking test accuracy for each value?", options: ["It's slower", "The test set would influence the choice and stop being an honest final check", "Test accuracy is always lower", "GridSearchCV can't do that"], answer: 1, explain: "Tuning on the test set leaks it into model selection." },
      ],
      exercise: {
        title: "Tune the tree",
        task: `<p>Cross-validate a depth-3 tree on the training data, then use GridSearchCV over depths 2 to 6 and unlimited. What depth wins, what's its cross-validated score, and what does it score on the test set?</p>`,
        files: ["churn.csv", "ml-completed.ipynb"],
        solution: [
          "<code>scores = cross_val_score(DecisionTreeClassifier(max_depth=3, random_state=42), Xd_train, yd_train, cv=5)</code> → [0.80, 0.767, 0.783, 0.767, 0.717], mean <strong>0.767</strong>.",
          "<code>grid = GridSearchCV(DecisionTreeClassifier(random_state=42), {\"max_depth\": [2, 3, 4, 5, 6, None]}, cv=5).fit(Xd_train, yd_train)</code>",
          "<code>grid.best_params_</code> → <strong>{'max_depth': 4}</strong>; <code>grid.best_score_</code> → 0.773.",
          "<code>grid.score(Xd_test, yd_test)</code> → <strong>0.72</strong>, a little below the cross-validated score, as is common.",
        ],
      },
    },
    {
      id: "responsible",
      title: "Using models responsibly",
      summary: "Choose a decision threshold, avoid data leakage, think about fairness, and save and reload a model to make predictions.",
      diagram: { type: "compare", left: { title: "Threshold 0.50", items: ["36 flagged", "precision 0.78", "recall 0.64"] }, right: { title: "Threshold 0.35", items: ["48 flagged", "precision 0.71", "recall 0.77"] }, accentRight: true, title: "Lowering the threshold finds more churners at the cost of false alarms" },
      steps: [
        {
          title: "Probabilities and thresholds",
          body: `<p><code>pipe.predict_proba(X)[:, 1]</code> gives each customer's probability of leaving; <code>predict</code> uses 0.5 as the cut-off. Lowering it to 0.35 flags 48 test customers instead of 36: recall rises from 0.64 to 0.77 while precision falls from 0.78 to 0.71. The right threshold depends on the cost of each kind of mistake.</p>`,
        },
        {
          title: "Data leakage",
          body: `<p>Leakage is when a feature contains information you wouldn't have at prediction time, such as a “cancellation reason” column for predicting cancellations. The model looks brilliant in testing and fails in use. For every feature, ask: would I know this value at the moment I need the prediction?</p>`,
        },
        {
          title: "Fairness and limits",
          body: `<p>Models learn patterns from historical data, including unfair ones. Check performance separately for groups the decision affects (here, recall for each plan), don't use features that act as stand-ins for protected characteristics, and keep a person involved in decisions that matter to people.</p>`,
        },
        {
          title: "Save and reuse",
          body: `<p><code>joblib.dump(pipe, "churn_model.joblib")</code> saves the whole pipeline, preprocessing included; <code>joblib.load</code> brings it back. New customers go in as a DataFrame with the same columns. Only load model files you created or trust, because loading one can run code.</p>`,
        },
      ],
      quiz: [
        { q: "What happens when you lower the decision threshold from 0.5 to 0.35?", options: ["Fewer customers are flagged", "More are flagged: recall rises, precision falls", "Accuracy always rises", "Nothing changes"], answer: 1, explain: "A lower bar flags more customers, catching more churners and more false alarms." },
        { q: "Which feature would leak information when predicting churn?", options: ["tenure_months", "monthly_fee", "cancellation_reason", "support_calls"], answer: 2, explain: "A cancellation reason only exists after the customer has left." },
      ],
      exercise: {
        title: "Save the model and score two customers",
        task: `<p>Save the Lesson 5 pipeline with joblib, load it back, and predict churn probabilities for two new customers: (3 months, 55.00, 4 calls, Pro, no auto-pay) and (48 months, 15.00, 0 calls, Basic, auto-pay).</p>`,
        files: ["ml-completed.ipynb"],
        solution: [
          "<code>joblib.dump(pipe, \"churn_model.joblib\")</code> and <code>loaded = joblib.load(\"churn_model.joblib\")</code>.",
          "<code>new = pd.DataFrame([[3, 55.0, 4, \"Pro\", \"no\"], [48, 15.0, 0, \"Basic\", \"yes\"]], columns=Xc.columns)</code>",
          "<code>loaded.predict_proba(new)[:, 1].round(3)</code> → about <strong>0.995</strong> and <strong>0.015</strong>.",
          "The first customer is very likely to leave; the second very unlikely. <code>loaded.predict(new)</code> gives [1, 0].",
        ],
      },
    },
  ],
  extras: {
    project: {
      id: "bonus-price-pipeline",
      title: "Bonus project: a full house-price pipeline",
      summary: "Add the neighborhood to the house-price model with a pipeline, compare it with the four-feature model, and check its errors by neighborhood.",
      diagram: { type: "compare", left: { title: "4 number features", items: ["MAE 21.24", "R² 0.955"] }, right: { title: "+ neighborhood (pipeline)", items: ["MAE 18.92", "R² 0.965"] }, accentRight: true, title: "One more feature, a clear improvement" },
      steps: [
        {
          title: "All features through a pipeline",
          body: `<p>Use every column except price: <code>X = houses.drop(columns="price_k")</code>. A ColumnTransformer scales the four numbers and one-hot encodes the neighborhood; a Pipeline adds the LinearRegression.</p>`,
        },
        {
          title: "Compare fairly",
          body: `<p>Use the same split (<code>test_size=0.25, random_state=42</code>) so the comparison is like for like. The pipeline's MAE drops from 21.24 to <strong>18.92</strong> and R² rises to 0.965: location carries information the numbers don't.</p>`,
        },
        {
          title: "Check errors by group",
          body: `<p>Put the test rows, predictions and absolute errors into one DataFrame and <code>groupby("neighborhood")</code> to see whether the model is equally good everywhere. Uneven errors point to something the model is missing in one area.</p>`,
        },
      ],
      quiz: [
        { q: "Why must both models use the same random_state?", options: ["To train faster", "So they're tested on exactly the same homes", "Pipelines require it", "To get the same coefficients"], answer: 1, explain: "A like-for-like comparison needs the same test set." },
        { q: "What does the improvement from adding neighborhood suggest?", options: ["The model overfits", "Location affects price beyond size, age and distance", "Neighborhood is leakage", "Scaling fixed the model"], answer: 1, explain: "The neighborhood adds real information about price." },
      ],
      exercise: {
        title: "Build and compare",
        task: `<p>Build the full pipeline, report its test MAE and R² against the four-feature model, and compute the mean absolute error for each neighborhood in the test set.</p>`,
        files: ["houses.csv", "ml-completed.ipynb"],
        solution: [
          "<code>X = houses.drop(columns=\"price_k\")</code>; split with <code>test_size=0.25, random_state=42</code>.",
          "ColumnTransformer: StandardScaler on the four number columns, OneHotEncoder on neighborhood; Pipeline with LinearRegression.",
          "Test MAE <strong>18.92</strong> and R² <strong>0.965</strong>, against 21.24 and 0.955 before.",
          "<code>res = X_test.assign(err=(y_test - pred).abs())</code> then <code>res.groupby(\"neighborhood\")[\"err\"].mean()</code> shows each area's average miss.",
        ],
      },
    },
    quizbank: [
      { q: "In scikit-learn, which method trains a model?", options: [".train()", ".fit()", ".learn()", ".predict()"], answer: 1, explain: "Every estimator learns with fit(X, y)." },
      { q: "What does R² of 0.955 mean?", options: ["95.5% accuracy", "The model explains about 95.5% of the variation in price", "The error is 4.5%", "95.5% of homes are predicted exactly"], answer: 1, explain: "R² is the share of variance explained." },
      { q: "What does stratify=y do in train_test_split?", options: ["Sorts the data", "Keeps the class proportions the same in train and test", "Removes duplicates", "Scales y"], answer: 1, explain: "Both sets keep the same share of churners." },
      { q: "Precision answers which question?", options: ["Of everyone who left, how many were flagged?", "Of everyone flagged, how many actually left?", "How many predictions were right?", "How fast is the model?"], answer: 1, explain: "Precision is about the flagged group." },
      { q: "A model scores much better on training than test data. What's that called?", options: ["Underfitting", "Overfitting", "Leakage", "Scaling"], answer: 1, explain: "A large train-test gap indicates overfitting." },
      { q: "What's a hyperparameter?", options: ["A learned weight", "A setting chosen before training, like max_depth", "The target column", "A metric"], answer: 1, explain: "Hyperparameters are set by you; parameters are learned." },
      { q: "Why is a Pipeline useful?", options: ["It makes models more accurate", "It runs preprocessing and model together and avoids leaking test data", "It's needed to save models", "It replaces cross-validation"], answer: 1, explain: "All steps learn from training data only, in order." },
      { q: "What should you check before loading a .joblib model file?", options: ["Its size", "That you created it or trust its source, since loading can run code", "Its date", "Nothing"], answer: 1, explain: "Model files can contain executable code." },
    ],
  },
  async makeFiles() {
    return {
      "houses.csv": housesCsv(),
      "churn.csv": churnCsv(),
      "ml-starter.ipynb": notebook(STARTER),
      "ml-completed.ipynb": notebook(COMPLETED),
    };
  },
};
