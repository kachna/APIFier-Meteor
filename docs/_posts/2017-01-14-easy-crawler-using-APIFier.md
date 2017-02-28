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

If you have no idea what previous sentences means keep reading as usual and try to understand. When you get lost ask some web designer around for short tutorial (this is really basics) or google some nonsense words and try to learn something.

**Line 9** returns extracted data object. Crawler's output is collection of this returned objects.

#### Run Console
Everything is ready. Go to **Run console** section and hit the Run button. Crawler wake up and go for a walk. You can watch its progress on various tabs.

**Page** display currently crawled page's screen shot.

**Results** is line by line data returned by page function. In additional you can see complete (or so far completed) results in CVS, JSON or XML format.

**Raw data** display array (item per crawled page) of [JSONs](https://en.wikipedia.org/wiki/JSON) containing detail information about crawl including Page function output. This data can be obtained later in page under View runs button.

**HTML** of currently crawled page.

**Log** contains detail information about Crawlers run. This is really useful for debuting crawlers. Actually for now it is only tool for debugging (sad).

**Queue** keeps URL to be crawled

So hit the Run button and watch the miracle! The result should be similar to fallowing screen shot.

![First crawler configuration and result screen shot]({{ site.url }}/assets/img/screenshots/first-crawler-screen.jpg)

names, prices and discount in percents for all offers on first page.
