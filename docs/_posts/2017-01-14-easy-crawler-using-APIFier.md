---
date: 2017-02-27
title: How to Setup and Run Web Crawler using APIFier
layout: post
---

[APIFier](http://www.apifier.com) is service providing hosted crawlers which are able to extract data from almost any web page. Crawler is controlled by simple JavaSctipt function called PAGE FUNCTION and minimal configuration (page of beginning, domain of interest, use proxy or not and so on). Complete Crawler design is done using APIFier's web application so you do not need any special tools only modern web browser.

### Create Account
Go to [APIFier's sign-up](https://www.apifier.com/sign-up) page and create Account. On your Account hompage (Crawlers) you can see example crawlers which are there by default. Other interesting pages (on the top menu) are:

* **Schedulers** - Where you can define automatic crawler start in given time or period.
* **Community** - Where are crawlers designed by other user for you. Check crawlers maybe there is one for your purpose.
* **Account** - Where are your personal data and your quota usage.

Using developer (free of charge) account you are able to crawl 10 000 (10k) pages every month. If you reach this limit you will not be able to run crawlers any more until periods end or you upgrade to [payed plan](https://www.apifier.com/pricing). 10k crawls can look enough but when you start first crawler you will observe how your data hunger is raising.

Think before you run crawler. Use Max pages per crawl in Crawler's Advanced settings section. Optimize its page scheduling and loading by careful settings of Pseudo-URLs, Clickable elements and Intercept request function. We will discus this settings in later part of tutorial. For now Advanced settings -> Max pages per crawl is enough.

### Crawler's goal
The goal is to extract discounted items from [Currys UK e-shop](http://www.currys.co.uk/). Because Cyrrys offer is exhausting and APIFier's developer plan is limited and this is only tutorial our Crawler should focus only on TVs which are discounted at least 10%. Extension of Crawler to extract more offers is in fact only removing of condition so it will be easy for you when you finish this post.

In the future offers extracted by this Crawler will be aggregated with offers from many other e-shops and they should be filterable and sortable and so on. To fulfill this goal every offer need few parameters:

* Type
* Brand
* Original price
* Discounted price
* Discount in percents
* Size in inches
* Resolution type (HD Ready, Full HD or 4K)
* URL of TV's image

### Create first Crawler
Create new Crawler ([Crawlers](https://www.apifier.com/crawlers) -> Add New). In Basic Settings there are most important crawler configurations which have to be filled for every crawler so lets walk through them.

#### Basic Settings
**Custom ID** is identificator of the Crawler. It can be also called Crawler's name. There is Internal ID field too which is true unique unchangeable ID so Custom ID is for your orientation.

**Comments** are for you and don't have effort on crawlers work. This field should help you in future to remember what for the crawler is and what data it produces.

**Start URLs** specifies pages which Crawler open first. **Optional label** is for future use in Page function. Particular URL or group of URLs can be detected in Page function by label and Crawler can threat different groups of URLs different way. More Start URLs can be set by hitting + button on the left side of box.

**Crawl pseudo-URLs** limits the range of URLs which can be visited by crawler. APIFIer crawlers are designed for special purpose to extract specific data. So it is good idea to keep them crawl desired group of domains, single domain or only path on domain. There is special syntax for regular expressions to say: Crawl only pages in category TV

    http://www.exmaple.com/electronics/tv/.....

Again **Optional label** can be specified here to recognize particular group of pseudo-URLs.

**Page function** is JavaScript function injected to crawled page. This means that when page is fully loaded function code is added to page's source code and executed. Page function code can manipulate DOM and extract data from nodes. It can also access to all standard browser's [API](https://www.w3.org/standards/webdesign/script.html). Not only Page function but also JavaScript libraries [jQuery](https://jquery.com/) and [Underscore](http://underscorejs.org/) are injected into the crawled page so they can be used inside the Page function.

### First Run
Back to the goal. Look at [Currys Televisions page](http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/xx-criteria.html). Lets start with something easy. As warm up extract offers category name (Televisions).

Editing any field cause save complete configuration. So do not look for Save button there is no one. Everything is save automatically.

**Custom ID**

    Currys TVs

**Comments**

    Extract offers from Currys.co.uk Televisions category

**Start URLs**

    http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/xx-criteria.html

**Crawl pseudo-URLs**    

Can stay empty because we will crawl only one page for now.

**Page function**

Change line 6 as fallow.

{% highlight javascript linenos %}

function pageFunction(context) {
  // called on every page the crawler visits, use it to extract data from it
  var $ = context.jQuery;
  var result = {
      // take headline element and extract text
      categoryName: $('h1.pageTitle').text()
  };

  return result;
}

{% endhighlight %}

If you are not familiar with web design you can be confused about line 6. What the hell is:

    $('h1.pageTitle')

In short **$** represents [jQuery](https://jquery.com/) library. It provides object which let you use CSS selectors ([MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors), [w3schools](https://www.w3schools.com/cssref/css_selectors.asp)) for selecting DOM Elements ([w3chsools](https://www.w3schools.com/jsref/dom_obj_all.asp), [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element)) and manipulate them (add, remove and change content - text or attributes). Easy, yes?

Easiest way how to find CSS selectors is using development tool of any modern browser. I usually don't use Chrome for browsing but their [DevTools](https://developer.chrome.com/devtools) are best. If you need information about any element you see on page just right click them and choose Inspect from context menu. On the bottom of tab called Elements you can see element's selector. If you want to change it you can verify your changes by [pressing Ctrl + F](https://developers.google.com/web/updates/2015/05/search-dom-tree-by-css-selector).

If you have no idea what previous two paragraphs means keep reading as usual and try to understand. When you get lost ask some web designer around you for short tutorial (this is really basics) or google some nonsense words and try to learn something.

**Line 9** returns extracted data object. Crawler's output is collection of data returned from every crawled page.

#### Run Console
Everything is ready. Go to **Run console** section and hit the Run button. Crawler wake up and go for a walk. You can watch its progress on various tabs.

**Page** display currently crawled page's screen shot.

**Results** is line by line data returned by page function. In additional you can see complete (or so far completed) results in CVS, JSON or XML format.

**Raw data** display array (item per crawled page) of [JSONs](https://en.wikipedia.org/wiki/JSON) containing detail information about crawl including Page function output. This data can be obtained later in page under View runs button.

**HTML** of currently crawled page.

**Log** contains detail information about Crawlers run. This is really useful for debuting crawlers. Actually for now it is only tool for debugging (sad).

**Queue** keeps URL to be crawled

So hit Run button and watch the miracle! The result should be similar to fallowing screen shot.

![First crawler configuration and result screen shot]({{ site.github.url }}/assets/img/screenshots/first-crawler-screen.jpg)

Yes, it works! But crawler outputs "Televisions". This isn't much helpful. You have to force crawler to find something what we didn't know before.

#### Extract more data
Lets change Page function to extract all offers. You have to find offer selectors. Right click on offer, choose Inspect. If right clicked let say on offers image you can see image selector. You have to walk up through the DOM tree until you reach offer element. In Chrome DevTools you can swipe over element on Elements tab by mouse and appropriate elements are highlighted on page. If you click the element the selector on the bottom of tab is change.

![How to find elements selector using Chrome DevTools]({{ site.github.url }}/assets/img/screenshots/chrome-devtools-selectors.jpg)
The right selector is:

    article.product.result-prd

jQure will find all elements matching this selector. You can check it in Chrome DevTools [Console](https://developers.google.com/web/tools/chrome-devtools/console/). Try to write on the bottom of Console tab

    $('article.product.result-prd')

and hit Enter. If you click on small grey triangle leading the result you will see list of offer elements (article tags).

Here is good to remember that **not all web pages including jQuery**. This is the reason why APIFier inject it to page for you. If you trying to extract data from page without jQuery you can do the same as APIFIer. To inject jQuery into any page execute in Chrome Console

    javascript:(function(){function l(u,i){
      var d=document;if(!d.getElementById(i)){var s=d.createElement('script');s.src=u;s.id=i;d.body.appendChild(s);}}l('http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js','jquery')})()

More about injecting jQuery to page on [StackOverflow](http://stackoverflow.com/questions/26573076/how-to-inject-jquery-to-any-webpage). There are also Chrome extension to inject jQuery to page.

Now you have all offers on page. The next step is to find name and price. Price is easy. It is strong tag with class price. The selector will be:

    strong.price

jQuery let you specifies based element for searching by CSS selector as second optional parameter:

    $('strong.price', offers[0])

Is selector for price element for first offer element. What you need is text inside element. Element's text often contains white spaces (space, end of line, tabulator, ...) because HTML parser ignores it.

**Good practices** here is **remove white spaces from all extracted string**. Use JavaScript string function .trim(). Complete command for price extraction is:

    $('strong.price', offers[0]).text().trim()

A bit complicated is selector for offer name. It is in span tag inside header tag but there is another span tag for brand. Fortunately there is also data-product attribute that distinguish name and brand.

![Structure of name and brand nodes]({{ site.github.url }}/assets/img/screenshots/name-selector.jpg)

In CSS Selectors you can specify attributes inside square brackets. If there is only attribute name then selector selects only elements having that attribute no matter which value is. There is also possibility to specify attribute value and filter elements on it. Base on this you are now able to specify selector for offer name and build command to extract it.

    $('header span[data-product="name"]', offers[i]).text(),

The complete code of Page function to extract offers names and prices is:

{% highlight javascript linenos %}

function pageFunction(context) {
  // called on every page the crawler visits, use it to extract data from it
  var $ = context.jQuery;

  var offers = $('article.product.result-prd');
  var result = []

  // iterate through offers
  for (var i = 0; i < offers.length; i++) {
    // add offer name and price to result array
    result.push({
      name: $('header span[data-product="name"]', offers[i]).text(),
      price: $('strong.price', offers[i]).text().trim()
    });
  }

  return result;
}
{% endhighlight %}  


Run the Crawler and watch the result. You can also click View runs on top of Crawlers page to see all Crawlers runs. If you select last run you can see many run details and also download data in various format. Simple JSON should look like this:

    [{
      "name": "LT-32C666 Smart 32\" LED TV with Built-in DVD Player - White",
      "price": "£229.99",
      "url": "http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/xx-criteria.html"
    },
    {
      "name": "LT-39C460 39\" LED TV",
      "price": "£189.00",
      "url": "http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/xx-criteria.html"
    },
    {
      "name": "43UH668V Smart 4k Ultra HD HDR 43\" LED TV",
      "price": "£449.00",
      "url": "http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/xx-criteria.html"
    },

    ...

    }]



If you watch the Currys TV section carefully there is written something like this (total count of offers may differ):

    Showing 1 - 20 of 201 results

but your results file contains 20 results. Is is not enough. Your Crawler has to learn how to use pagination on the bottom of the page.

### Crawl multiple pages

There is around ten pages per twenty offers. To speed up the Crawler and save some pages from account Quota you can work with page as usual user to get bettet Start URL for Crawler.

![Offers count per page]({{ site.github.url }}/assets/img/screenshots/offers-count.jpg)

From *Show* dropdown menu top right on the page can be selected option *50 products per page*. This choice decrease number of offers listing pages to less than one half. Start URL will change to:

    http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/1_50/relevance-desc/xx-criteria.html

Crawler is visiting only URLs maching start URL or Pseudo-URLs. So you have to define Pseudo-URL (it is URL combined with [regular expressions](https://en.wikipedia.org/wiki/Regular_expression)) cowering all TVs listing pages but nothing else. If your Pseudo-URL will be more general than you need your Crawler runs out and start crawling page which you are not interested in.

First of all fond the patter offers listings pages URLs. Watch this and try to find how is page number influent the pages URL:

    Page 1 - http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/1_50/relevance-desc/xx-criteria.html
    Page 2 - http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/2_50/relevance-desc/xx-criteria.html
    Page 3 - http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/3_50/relevance-desc/xx-criteria.html
    ...

Do you see it? Maybe no. Try this:

    Page 1 - ...x_xx/1_50/relevance-desc/xx-criteria.html
    Page 2 - ...x_xx/2_50/relevance-desc/xx-criteria.html
    Page 3 - ...x_xx/3_50/relevance-desc/xx-criteria.html
    ...

Yes, you have it! Page number is hidden before *50*. The fifty actually means the number of offers per page. So tray to change back to 20 offers per page and watch the change in URL. Pattern is discovered. Next step is to encode this pattern as regular expression. The expression

    [0-9]+

represents one char which can be number from zero to nine. The plus at the end of expression means that this char can repeated but has to present at least once. Repeating in needed for page numbers like 12, 375, ... More about regular expression can be found on [Regular-Expressions.info](http://www.regular-expressions.info).

Last step is include the expression to URL. The APIFier's Pseudo-URLs has special syntax. When you including regular expression into URL put it between square brackets:

    ...xx/[regular expression]_50/rele...

[//]: # "a_ comment to stop highlighting of code"

Crawl pseudo-URLs for listing pages should be set to:

    offers-listing : http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/[[0-9]+]_50/relevance-desc/xx-criteria.html

[//]: # "a_ comment to stop highlighting of code"

Now when Crawler starts it go to Start URL, extracts data (it means 50 offers) a than finds all clickable elements (links, buttons, dropdown menus, ... ) and check all requests to open page produced by them. If any of requests URL match Crawl pseudo-URLs Crawler schedule that request URL to its crawling queue. You can watch this process in *Run console -> Log* tab and result can be seen in *Run console -> Queue*.

Start the crawler and collect results. Now you have to has all offers (around 200) in Televisions category. Thats it. Done. You have your first Crawler, congratulations!!!

Wait, do you remember the [goal](#crawlers-goal)? It is not done yet. We need more data. Big data! Bigger data!

### Extract data from offer details page

Crawler is able to extract all offers but the [goal](#crawlers-goal) is to get much more information than name and price. These informations are on offer detail page. So first of all you have to extend the crawling are by new Crawl pseudo-URLs group matching all TVs offers details (ideally nothing more). So you have to find pattern defining product detail URLs. Watch few of them for a while.

    http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/samsung-ue32j4510-smart-32-led-tv-white-10139608-pdt.html
    http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/samsung-ue49k5600-smart-49-led-tv-10145699-pdt.html
    http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/seiki-se40fo02uk-40-led-tv-10147930-pdt.html
    http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/sony-bravia-kdl49wd754bu-smart-49-led-tv-10144221-pdt.html

Here it is obvious. It is that part of URL before *.html* and after last slash (/). This part also contains some kind of numeric ID and *-pdt* but it does not matter you can threat it as varying part of URL. Time for regular expression to match the part representing particular product:

    [^/.]+

Square brackets represents character and plus on the end of expression means one or more repetitions. That is what you have seen before. You know that URL part of your interest is limited by */* and *.*(*html*) and the part do no contain these two symbols. You can say that the repeating character can be any character excluding */ (slash)* and *. (dot)*. This is what *^* symbols do.

You can turn it over and use positive attitude. If you write:

    [a-z0-9-]+

This say: One or more character which can be lower case letter (a-z) or number (0-9) od dash (-).

Click on plus sign in Crawl pseudo-URLs and add next pseudo URL perpended by label *offers-listing* to authorize Crawler to visit offers details:

    offers-listing : http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/[[a-z0-9-]+].html

From now Crawler change its behavior. It still continues visiting offers listing page but from now it will not extract any data from listing page. It is visiting the page only to find links to the offers details pages and enqueue them to it's crawling Queue. Data them self are extracted from offer detail page in later step.

#### Using labels

To extract data form offer details page you have to change Crawler's Page function. Your Crawler visiting two categories of pages *offers listings* and *offers details*. During the process of crawling particular page Crawler need to know to which group the page belongs. Base on that information it tries to extract data or not. This is the purpose of labels.

If you look at *pageFunction* you can see that is getting one parameter called context.

    function pageFunction(context) {

That parameter represents Crawler's internal [Context object](https://www.apifier.com/docs#pageFunction) containing useful function and data. One of Context's attribute is request containing information about the currently loaded page including URL's label from Start URLs of Crawler pseudo-URLs. So you can use construct like this:

{% highlight javascript linenos %}

if (context.request.label == 'offer-detail') {
  // extract data
  var result = {
    // ...
  };

  return result;
}

{% endhighlight %}

Now the data extraction. You should be able to find the right selectors. Remember there is many ways how to point to particular data so your extraction can be different than this:

{% highlight javascript linenos %}

var result = {
    type: $('h1 span').eq(1).text().trim(),
    brand: $('h1 span').eq(0).text().trim(),
    originalPrice: Number($('div.prd-past-amounts span').eq(0).text().slice(1)),
    currentPrice: Number($('div.amounts strong.current').eq(0).text().slice(1)),
    discount: Math.round(Number($('div.amounts[data-discountpercent]').attr('data-discountpercent'))),
    resolution: $('table.simpleTable tr:contains("Resolution") td').text().trim(),
    image: $('li.prd-image.current a').attr('href')
};

{% endhighlight %}   

In code before there is two new things.

First is [*eq()*](https://api.jquery.com/eq/) function of jQuery. It is helpful when selector finds more than one matching element. Using *eq()* you can choose which one of result you want by zero based index.

Second is on **Line 4, 5 and 6**. It is converting text data to JavaSctipt [*Number*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) object. It is good practice to handle numbers as numbers not as strings for future sorting and comparison. But Number need string without letters so there is [*slice*](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Global_Objects/String/slice) function to remove first symbols (*£*). On *Line 6* there is [*round()*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) function from [*Math object*](https://developer.mozilla.org/cs/docs/Web/JavaScript/Reference/Global_Objects/Math).

Complete code of Page function can be:

{% highlight javascript linenos %}
function pageFunction(context) {
    // called on every page the crawler visits, use it to extract data from it
    var $ = context.jQuery;

    if (context.request.label == 'offer-detail') {

        var result = {
            type: $('h1 span').eq(1).text().trim(),
            brand: $('h1 span').eq(0).text().trim(),
            originalPrice: Number($('div.prd-past-amounts span').eq(0).text().slice(1)),
            currentPrice: Number($('div.amounts strong.current').eq(0).text().slice(1)),
            discount: Math.round(Number($('div.amounts[data-discountpercent]').attr('data-discountpercent'))),
            resolution: $('table.simpleTable tr:contains("Resolution") td').text().trim(),
            image: $('li.prd-image.current a').attr('href')
        };

        return result;
}

{% endhighlight %}    

Before you run the crawler you can change *Advanced Settings -> Max pages per crawl* to let say 10 (or 100) for testing purposes. It is for sure. If you made a mistake somewhere before your Crawler can start crawling different pages than you planned and in worse case newer spot (or exceed your Quota). Now run it!

The result should be prefect now. Similar to this:

    [{
      "value": null,
      "url": "http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/1_50/relevance-desc/xx-criteria.html"
    },
    {
      "type": "LT-39C460 39\" LED TV",
      "brand": "JVC",
      "originalPrice": 0,
      "currentPrice": 299,
      "discount": 0,
      "size": "1366 x 768",
      "image": "http://brain-images.cdn.dixons.com/6/2/10147526/u_10147526.jpg",
      "url": "http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/jvc-lt-39c460-39-led-tv-10147526-pdt.html"
    },
    {
      "type": "49UH668V Smart 4k Ultra HD HDR 49\" LED TV",
      "brand": "LG",
      "originalPrice": 699,
      "currentPrice": 499,
      "discount": 29,
      "size": "3840 x 2160",
      "image": "http://brain-images.cdn.dixons.com/5/6/10144965/u_10144965.jpg",
      "url": "http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/lg-49uh668v-smart-4k-ultra-hd-hdr-49-led-tv-10144965-pdt.html"
    },
    {
      ....
    },

Great!

#### Skipping output

But... There is still one disturbing thing. It is first result. Why the hell is there:

    "value": null,

Watch the URL. Is it familiar?

    "url": "http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/1_50/relevance-desc/xx-criteria.html"

Bingo! It is offer listing page. There is nothing written in Page function what to do when Crawler visits offer listings. OK, it has to go there to get all URLs and enqueue all of them matching offer details page but there is nothing extracted so *pageFunction* returns *None* (*null*). But why should be *null* be presented in results? It shouldn't. Fortunately there is Context function called **skipOutput()**. You can add it to the end of function for case when offer details isn't crawled:

{% highlight javascript linenos %}

function pageFunction(context) {
    // called on every page the crawler visits, use it to extract data from it
    var $ = context.jQuery;

    if (context.request.label == 'offer-detail') {

        var result = {
            type: $('h1 span').eq(1).text().trim(),
            brand: $('h1 span').eq(0).text().trim(),
            originalPrice: Number($('div.prd-past-amounts span').eq(0).text().slice(1)),
            currentPrice: Number($('div.amounts strong.current').eq(0).text().slice(1)),
            discount: Math.round(Number($('div.amounts[data-discountpercent]').attr('data-discountpercent'))),
            resolution: $('table.simpleTable tr:contains("Resolution") td').text().trim(),
            image: $('li.prd-image.current a').attr('href')
        };

        return result;

    } else {
        context.skipOutput();
    }

}
{% endhighlight %}    



### Crawl only discounted offers

TODO

#### Enqueue URL manually

TODO
