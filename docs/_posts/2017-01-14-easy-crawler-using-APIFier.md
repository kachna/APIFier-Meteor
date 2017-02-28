---
date: 2017-01-27
title: How to Setup and Run Easy Crawler using APIFier
layout: post
---

[APIFier](http://www.apifier.com) is service providing hosted crawlers which are able to extract data from almost any web page. Crawler is controlled by simple JavaSctipt function called PAGE FUNCTION and minimal configuration (page of beginning, domain of interest, use proxy or not and so on). Complete Crawler design is done using APIFier's web application so you do not need any special tools.

### Create Account
Go to [APIFier's sign-up](https://www.apifier.com/sign-up) page and create Account. On your Account hompage (Crawlers) you can see example crawlers which are there by default. Other interesting pages (on the top menu) are:

* **Schedulers** - Where you can define automatic crawler starting in given time or period.
* **Community** - Where are crawlers designed by other user for you. Check in maybe there is crawler fo your purpose.
* **Account** - Where are your personal data and your quota usage.

Using free account you are able to crawl 10 000 (10k) pages every month. If you reach this limit you will not be able to run crawlers until periods end or you upgrade to [payed plan](https://www.apifier.com/pricing). 10k crawls can look enough but when you start first crawler you will observe how your data hunger is raising.

### Crawler's goal
The goal is to extract discounted items from [Currys UK e-shop](http://www.currys.co.uk/). Because Cyrrys offer is exhausting and APIFier's developer plan is limited Crawler should focus only on TVs which are discounted at least 10%. In the future offers will be aggregated from many e-shops and they should be filterable and sortable and so on. To fulfill this goal every offer need few parameters:
* Type
* Brand
* Original price
* Discounted price
* Discount in percents
* Size in inches
* Resolution type (HD Ready, Full HD or 4K)

### Create first Crawler
Create new Crawler ([Crawlers](https://www.apifier.com/crawlers) -> Add New). In Basic Settings there are most important crawler configurations which have to be filled for every crawler so lets walk through them.

#### Basic Settings
**Custom ID** is identificator of the Crawler. It can be also called Crawler's name. There is also Internal ID field which is true unique unchangeable ID so Custom ID is for your orientation.

**Comments** are also for you and don't have effort on crawlers work. This field should help you in future to remember what for the crawler is and what data it produces.

**Start URLs** specifies pages which Crawler open first. **Optional label** can be specified for future use. Particular URL or group of URLs can be detected in Page function by label. More Start URLs can be set by hitting + button on the left side of box.

**Crawl pseudo-URLs** limits the range of URLs which can be visited by crawler. APIFIer crawlers are designed for special purpose to extract specific data. So it is good idea to keep them crawl desired domain or only path. There is special syntax for regular expressions to say: Crawl only pages of in category

    http://www.exmaple.com/electronics/tv/.....

Again **Optional label** can be specified here to recognize particular group of pseudo-URLs.

**Page function** is JavaScript function injected to crawled page. This means that when page is fully loaded function code is added to page's source code and executed. Page function code can manipulate DOM and extract data from nodes. It can also access to all standard browser's [API](https://www.w3.org/standards/webdesign/script.html). Not only Page function but also JavaScript libraries [jQuery](https://jquery.com/) and [Underscore](http://underscorejs.org/) are injected into the crawled page so they can be used inside the Page function.

### First Run
Back to the goal. Look at [Currys Televisions page](http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/xx-criteria.html). Lets start with something easy. As warm up extract offers category name (Televisions).

Editing any field cause save complete configuration. So do not look for Save button. Everything is save automatically.

**Custom ID**

    Currys TVs

**Comments**

    Extract offers from Currys.co.uk Televisions category

**Start URLs**

    listing-page : http://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/301_3002_30002_xx_xx/xx-criteria.html

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

If you have no idea what previous two paragraphs means keep reading as usual and try to understand. When you get lost ask some web designer around for short tutorial (this is really basics) or google some nonsense words and try to learn something.

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

Yes, it works! But crawler outputs "Televisions". This isn't much helpful. We have to force crawler to find something what we didn't know before.

#### Extract more data
Lets change out Page function to extract all offers. We have to find offer selectors. Right click on offer, choose Inspect. If right clicked let say on offers image you can see image selector. You have to walk up through the DOM tree until you reach offer element. In Chrome DevTools you can swipe over element on Elements tab by mouse and appropriate elements are highlighted on page. If you click the element the selector on the bottom of tab is change.

![How to find elements selector using Chrome DevTools]({{ site.github.url }}/assets/img/screenshots/chrome-devtools-selectors.jpg)
The right selector is:

    article.product.result-prd

jQure will find all elements matching this selector. You can check it in Chrome DevTools [Console](https://developers.google.com/web/tools/chrome-devtools/console/). Try to write on the bottom of Console tab

    $('article.product.result-prd')

and hit Enter. If you click on small grey triangle leading the result you will see list of offer elements (article tags).

Here is good to remember that **not all web pages including jQuery**. This is the reason why APIFier inject it to page for you. You can do the same as APIFIer and execute in console

    javascript:(function(){function l(u,i){
      var d=document;if(!d.getElementById(i)){var s=d.createElement('script');s.src=u;s.id=i;d.body.appendChild(s);}}l('http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js','jquery')})()

More about injecting jQuery to page on [StackOverflow](http://stackoverflow.com/questions/26573076/how-to-inject-jquery-to-any-webpage). There are also Chrome extension to inject jQuery to page.

Now you have all offers on page. The next step is to find name and price. Price is easy it is strong tag with class price. The selector will be:

    strong.price

jQuery let you specifies based element for searching by CSS selector as second optional parameter:

    $('strong.price', offers[0])

Is selector for price element for first offer element. What you need is text inside element. Element's text often contains white spaces (space, end of line, tabulator) because HTML parser ignores it.

**Good practices** here is **remove white spaces from all extracted string** for this purpose is JavaScript string function .trim(). Complete command for price extraction is:

    $('strong.price', offers[0]).text().trim()

A bit complicated is selector for offer name. It is in span tag inside header tag but there is another span tag for brand. Fortunately there is also data-product attribute that distinguish name and brand. In CSS Selectors you can specify attributes inside square brackets. If there is only attribute name then selector selects only elements having that attribute no matter which value is. There is also possibility to specify attribute value and filter elements on it. Base on this you are now able to specify selector for offer name and build command to extract it.

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


### Crawl multiple pages


{% highlight javascript linenos %}

  var offers = $('article.product.result-prd');

  var result = offers.map(function(offer, ix) {
    return {
      name: $('.productTitle span[data-product="name"]', offer).text(),
      price: $('strong.price', offer).text().trim()
    };
  });

    return {offers: result};

{% endhighlight %}    

Now it is possole

### Extract data from offers details
names, prices and discount in percents for all offers on first page.

### Crawl only discounted offers
