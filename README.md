# EasyEV
## EV's Made Easy - The Simplest Personalized Experience for All Things EV
### By Anderson Tsai and Jeffrey Shen
#### Submission for LA Hacks 2021
<br>

Electric vehicles are inevitably the future of transportation. However, the novelty of electric vehicles may cause uncertainty. EasyEV is a website made to inform the uninformed about electric vehicles, and to guide the interested into finding their electric vehicle that suits all their needs. The website contains a personalized questionnaire to evaluate the needs of an individual, and shows them the the three most suitable electric vehicles given their responses. The user can then compare the specifications of the vehicles, and find the one that they prefer most. The website employs various news and stocks API's, along with Google Cloud and Twilio services, to deliver an informative experience that is both elegant and eloquent.

## Layout
### Home
The home page features navigation for the user to start a quiz or visit the news page. The text below the banner explains reasons to purchase an electric vehicle, and has drop-down menus for answers to frequently-asked questions.

<!-- ![Home Demo](https://i.imgur.com/akvgO6k.gif) -->
![Home Demo 2](https://i.imgur.com/dsrnX51.gif)

### Explore
The explore page contains a grid containing a vast collection of various electric vehicles. 

![Explore Page Demo](https://i.imgur.com/pEwwrW9.gif)

The user can choose to sort this collection by manufacturer, and also has the option to search for a particular car by its name. Each car in the grid can be expanded to reveal more information. 

![Explore Company Demo](https://i.imgur.com/qPSavsW.gif)

If a car has not been released yet, the user can opt in to receive an texts about updated to the car they are interested in. This is accomplished through the Twilio API.

![Receive message Demo](https://i.imgur.com/c0P5Eal.gif)


### Compare
The compare page allows the user to compare any two cars by selecting them from a drop-down menu. The differences in the specifications of the two cars are highlighted by color. Red means that a car is worse in a certain specification and green means that a car is better in a certain specification.

![Compare Demo](https://i.imgur.com/KA8A6MM.gif)

### EV Quiz
The quiz page features three questions about the user's preferences accompanied by three dropdown menus for each question. After choosing an option for each question, the two cars that fit the criteria the most are shown and compared.

<!-- ![EV Quiz Demo](https://i.imgur.com/BwPPK1t.gif) -->
![EV Quiz Demo 2](https://i.imgur.com/yjuiwwZ.gif)

### News
The news page has stock information of various companies at the top, where a ticker is red when the company's stock price is down on the day, and green when the company's stock is up on the day. Below the stock section, news articles pertaining to electric vehicles are shown, where the image, title, date, description, and sentiment score are displayed for each article. The sentiment score is determined by feeding the contents of the article into the Google Cloud natural language processing service. The stock and news information is updated live, and retrieved using API's provided by GNews and AlphaVantage.

![News Demo](https://i.imgur.com/YL9kT7a.gif)

