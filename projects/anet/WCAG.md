# Getting started
- <a href="#user-content-background">Background</a>
- <a href="#user-content-what-wcag-level-we-should-support">What WCAG Level we should support</a>
- <a href="#user-content-how-to-validate-the-wcag-implementation">How to validate the WCAG implementation</a>
- <a href="#user-content-wcag-testing-tool-wave">Install accessibility testing tool - WAVE</a>
    * <a href="#user-content-introduction">Introduction</a>
    * <a href="#user-content-usage">Usage</a>
    * <a href="#user-content-wave-views">WAVE views</a>
    * <a href="#user-content-detected-options">Detected options</a>
    * <a href="#user-content-which-options-we-need-to-fix">Which options we need to fix</a>
    * <a href="#user-content-how-to-fix-the-detected-options">How to fix detected options</a>
- <a href="#user-content-wcag-testing-tool-jaws">Install screen reader testing tool - JAWS</a>
    * <a href="#user-content-jaws-introduction">Introduction</a>
    * <a href="#user-content-jaws-usage">Usage</a>
- <a href="#user-content-working-process">Working process</a>
   - <a href="#user-content-1-add-wcag-support-by-wave">Add WCAG support by WAVE</a>
   - <a href="#user-content-2-ensure-keyboard-operation-as-expected">Ensure keyboard operation as expected</a>
   - <a href="#user-content-3-ensure-the-screen-reader-can-read-off-the-content-as-expected">Ensure the screen reader can read off the content as expected</a>
- [Solutions for specific cases](#user-content-solutions-for-specific-cases)
  - [Link](#user-content-link)
  - [Checkbox](#user-content-checkbox)
  - [keyboard event such as onKeyDown not work when Jaws open](#user-content-the-keyboard-event-of-the-link-cant-work-with-jaws-running-in-ie)
  - [The button can't nested a clickable link](#user-content-the-button-cant-nest-a-clickable-link)
  - [Make SVG a none focusable element](#user-content-in-ie-the-svg-element-will-be-a-focusable-element-to-prevent-the-behavior-should-set-the-focusable-to-be-false)
  - [JAWS read all dialog cotent no matter where the focus is](#user-content-the-jaws-will-read-all-the-modaldialog-content-whether-focus-element-by-tab-or-just-open-the-dialogmodal)
- [UX wcag common rule](http://ux.active.com/wireframes/ANE/WCAG%20Guideline%202.0/#g=1&p=input_box)
<br />

---

<br />

# Background
As required from product team, we must add WCAG 2.0 support in CUI site. This document only help you to know what assistive accessibility development tool we decided to use and what's the correct working process you need to follow. 

As for what WCAG 2.0 is - please get into the detail from link [WCAG 2.0](https://www.w3.org/TR/WCAG20/).

<br />

# What WCAG Level we should support
In current development phase, we just need to support  **WCAG 2.0 Level AA** that has been confirmed with product team.

<br />

# How to validate the WCAG implementation
Due to the legacy CUI site has already completed the **WCAG Level AA** support in the past year, so the WCAG validation rules have been established.

The rules is:
1. Pass all the detection options in WAVE report.
2. Pass the QA's test about **keyboard operation** and **screen reader**.

<br />

# WCAG testing tool - WAVE

## Introduction

WAVE is developed and made available as a free community service by [WebAIM](http://webaim.org/). It provides visual feedback about the accessibility of your web content by injecting icons and indicators into your page. 

Currently, we choose WAVE as our WCAG testing tool(Both the legacy CUI and the new CUI project)

<br/>

## Usage
---
### Chrome plugin(recommend): 
To run a WAVE report:
- **Approach 1:** Click on the WAVE icon to the right of your browser address bar. Click the icon again or refresh the page to remove the WAVE interface.

- **Approach 2:** You can also trigger a WAVE report by pressing Control + Shift + U (Command + Shift + U on Mac) or by activating the "WAVE this page" context (right click) menu item.

    [Plugin address](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)

### Online site: 
To run a WAVE report:
- Type your web site address in the Input box and then clicking the arrow icon or pressing Enter key will enter the WAVE report interface.

    [Site address](http://wave.webaim.org/)

<br/>

## WAVE views
---
WAVE displays accessibility information in three ways:
- Styles
- No Styles
- Contrast

### Styles view
This view will presents your page with the embedded accessibility icons and indicators. This is the default view with most WAVE features enabled. 

If your page is too complex and becomes difficult to read(such some accessibility icons overlapped), you can select the **`No Styles`** view.

### No Styles view
Displays your page with styles disabled and tables linearized, thus revealing the unstyled HTML and the WAVE icons and indicators. This view also presents the underlying reading and navigation order, the order in which keyboard-only and screen reader users will access the page.

### Contrast view
Shows only contrast issues on your page, based on WCAG 2.0 guidelines. You can use the tools in the details panel to review your color contrast, and even get updated colors that meet these guidelines.

<br/>

## Detected options
---
WAVE will detected the following options:
- Errors
- Alerts
- Features
- Structural Elements
- HTML5 and ARIA
- Contrast Errors

<img width="180" src="/uploads/c3e5e7550eea9c294460944c35ec422f/Screen_Shot_2017-06-15_at_10.02.16_AM.png" />

Each color corresponds to one type of icon on the page, such as the following:

<img width="100" src="/uploads/e4f8793a93b867aff1471ce4518f6871/Screen_Shot_2017-06-15_at_10.16.40_AM.png" />

<br/>

## Which options we need to fix
----
We must fix the following two options:
1. Errors
2. Alerts

We need to confirm the options below if they can convey the content and function as expected or acceptable:
1. Features
2. Structural Elements 
3. HTML5 and ARIA

Option **Contrast Errors** don't need to care.

<br />

## How to fix the detected options
---
The specific operations listed as below:
1. Switch WAVE report panel to the detail tab and then choose the **WCAG Level A** in the filter dorpdown.
2. Clicking icon on the page to get the indicators dialog.
3. Clicking the **More Information** link to get underlying accessibility information (Include help info about how to fix it).
4. Fix it according to the documentation.

    Step 1:

    <img width="260" src="/uploads/273e853fd72f7368e68725b25e9bdf9c/Screen_Shot_2017-06-15_at_10.37.35_AM.png" />

    Step 2:

    <img width="260" src="/uploads/29f2a1b51a846e65c7d97ad11a736fef/Screen_Shot_2017-06-15_at_10.16.40_AM.png" />

    Step 3:

    <img width="260" src="/uploads/28eb68cee689d3f57e5a054945c51162/Screen_Shot_2017-06-15_at_10.56.46_AM.png" />


<br/><br/>

---
**Figure 1：** Show WAVE report and injecting icons

<img width="600" src="/uploads/51d101d04558fc44887a4eb82e106bf7/screenshot--2017-06-13-15-49-47.jpeg" />
--- 

<br/>

**Figure 2：**  The WAVE icon on Chrome Address Bar

<img width="350" src="/uploads/a9e4294623f6aa3ee273e5d253a090b5/screenshot--2017-06-13-15-49-47__1_.jpeg" />
--- 

<br/>

**Figure 3：** Online site

<img width="350" src="/uploads/e434142da1e772a2eaf361ecf2168d75/screenshot-wave.webaim.org-2017-06-13-16-53-46.jpeg" />

<br />

# Working process

## 1. Add WCAG support by WAVE
Ensure all elements on the page you are responsible for can pass WAVE's check.

## 2. Ensure keyboard operation as expected
After finish the work of fixing errors reported by WAVE, the next work is manually test on the page if the keyboard operation works as expected. 

You should confirm:
1. All link elements can get focus.
2. All form elements can get focus.
3. The focus order is consistent with the DOM order. (Using WAVE's no style view you could see the DOM order)

## 3. Ensure the screen reader can read off the content as expected
We use the **VoiceOver** function powered by MAC system to validate our implementation.

The operations listed as the following:
1. Open **System Perferences** option --> **Accessibility** option --> **VoiceOver** option.
2. Check the **Enable VoiceOver** to turn on the screen read function.
3. Open your page and press **tab** key to listen the voice content if it is correct.

<img width="500" src="/uploads/2546946feeba14639e01943eecc2dc6a/Screen_Shot_2017-06-16_at_10.11.37_AM.png" />
---
<img width="500" src="/uploads/93ce7fd419b27e22d26bc25b8847ad18/Screen_Shot_2017-06-16_at_10.22.47_AM.png" />
---
<img width="700" src="/uploads/966c5b08c2a78168eda921383e616028/Screen_Shot_2017-06-16_at_10.28.12_AM.png" />

<br />

## Solutions for specific cases
---
### Link
---
#### [-Alerts-] - Broken same-page link
Case happened:
```js
data.map(item => (
  <a href="#hash" onClick={(e) => {...}}>
    ...
  </a>
));
```
In this case, remove **href** can solve this alert issue, but it will introduce another new issue - the links will lose the ability of getting focus, so the right solution is:
```js
data.map(item => (
  <a 
    id={`anchor-description-${item.id}`}
    href={`#anchor-description-${item.id}`}
    onClick={(e) => {...}}
  >
    ...
  </a>
));
```

### When the JAWS is running in IE, the screen reader  will not work as expect if `a` element contain  `javascript:void(0)`

---

**Scenario**

if you has code as below, screen reader will just read key name when you using key to operate.

eg. press `space` key on below `a` element, screen reader will only read `space`, not read `expand` or `collaspe` status.

```javascript
<a onClick={this.toggleCollapse} aria-expanded={expanded} href="javascript:void(0)"/>
```

**Solution:**
just need to append semicolon `;` in `href` property

```javascript
<a onClick={this.toggleCollapse} aria-expanded={expanded} href="javascript:void(0);"/>
```

### Checkbox
---
#### [-Errors-] - Empty form label
Case happened when the checkbox has no text content
```js
<Checkbox
  onChange={(e) => {...});
  }} checked={...} size="m" defaultChecked={false} value="agree"
/>
```

The solution is:
1. Add `WCAG.Placeholder` as the label text of Checkbox. (It is a invisible text and the screen reader would not read it)
2. Add `aria-labelledby` to point to the real form control description.

```js
import WCAG from 'shared/components/WCAG';

<Checkbox
  aria-labelledby={`aria-labelledby-${id}`}
  onChange={(e) => {
    this.props.changeAgreementEntryAction({
      id,
      value: e.target.checked
    });
  }} checked={waiversAgreements[id].value} size="m" defaultChecked={false} value="agree"
>
  <WCAG.Placeholder type='label' />
</Checkbox>

<div id={`aria-labelledby-${id}`}>
  //for screen reader
</div>
```

### The keyboard event of the link can't work with JAWS running in IE
---

When the JAWS is running, if bind onKeyDown or other keyboard event to the link(a), the event will not been triggered, only the onClick event can been triggerred when the user click Enter/Space. That's to say, the click event is usually the only event fired for IE and JAWS/NVDA combinations.

Issue solution find by the resources:
1. [Fix details polyfill for JAWS and NVDA in IE](https://github.com/alphagov/govuk_elements/pull/440)
2.  [Screen Readers and details/summary](http://accessibleculture.org/articles/2012/03/screen-readers-and-details-summary/)
3.  [Making elements keyboard focusable and clickable](https://www.456bereastreet.com/archive/201302/making_elements_keyboard_focusable_and_clickable/)
4.  [Building Accessible Buttons with ARIA: A11y Support Series](https://www.deque.com/blog/accessible-aria-buttons/)
5. When the JAWS is running, replace the role attribute according to the usage, the onKeyDown or other keyboard event may will been triggered.[roles list](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#roles)
for example: anchor tag with role tab onkeydown will been triggered, and can get the ENTER/SPACEBAR keycode.
```js
        <a
          className={headerCls}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          href="javascript:void(0)" // eslint-disable-line
          onKeyDown={this.onPanelHeaderKeyDown}
          aria-label={isActive ? ariaLableExpand : ariaLableCollapse}
          role="tab"
          aria-expanded={isActive}
        >
          {
            isFunction(Header) ?
              <Header onToggleClick={this.handleItemClick} />
              :
              this.renderDefaultHeader()
          }
        </a>
```

### The button can't nest a clickable link
---

because the react encapsulate the event, but did't do well for the button element.In IE it trigger the clickable link in the way of capture.

The case is the Collapse component
```
<button
  class="an-collapse-item__header is-focusable"
  tabindex="0" href="javascript:void(0)"
  onClick={this.toggleItem}
  aria-label="Section 1 Who are you enrolling? collapse detail clickable arrow" role="button" aria-expanded="true"
>
  <div onClick={e => e.stopPropgation()}>
    1. Who are you enrolling?
    <i class="icon icon-chevron-down" onClick={this.toggleItem}></i>
  </div>
</button>

// code change please see https://gitlab.dev.activenetwork.com/ActiveNet/react-base-ui/merge_requests/373/diffs
```

If we use the button instead the a element like the code above, click the Panel Header will also expand/collapse the panel item, but the require is that we can only expand/collapse the panel item by the icon.

*Note:* If we upgrade react version to an event been well encapsulated version, then the best to use is button rather than a element, because the button keyboard events work well in IE even the JAWS is running.

### In IE, the Svg element will be a focusable element, to prevent the behavior, should set the "focusable" to be false
---

Solution:
```
<Icon name="calendar-o" focusable="false"/>
```

### When the JAWS is running in IE, the Enter/Space will not work to expand or collapse the panel, issue about ANE-92385
---

The reason is that I add the padding top/bottom for the `.an-collapse-item__header > div`, it makes the A element full of DIV element, and the DIV element bind the click event to stopPropgation, so the click event of the A element will not been triggered.

```
<a
  class="an-collapse-item__header is-focusable"
  tabindex="0" href="javascript:void(0)"
  aria-label="Section 1 Who are you enrolling? collapse detail clickable arrow" role="button" aria-expanded="true"
>
  <div>
    1. Who are you enrolling?
    <i class="icon icon-chevron-down"></i>
  </div>
</a>

.an-collapse-item__header > div {
  padding-top: 16px;
  padding-bottom: 16px;
}
```

Solution:
Change the css I made change back to the original implementaion,which is as bellow, but the padding part of the A element will be able to been clicked to trigger the toggle of the panel, which is also unreasonable, but has no chooce.
```
.an-collapse-item__header {
  padding: 16px 0;
}
```

### The JAWS will read all the modal/dialog content whether focus element by tab or just open the dialog/modal
---

The reason is that the modal is given a role of `dialog`

Solution:
change the role to `tooltip`
```
<Modal
  title="System Message"
  onClose={() => this.handleClose()}
  shown={shown}
  role="tooltip"
>
  <div className="modal-body">
    <div>
      <p>
        Your session has timed out or server error. You must log-in again.
      </p>
    </div>
  </div>
  <div className="modal-footer">
    <Button type="strong" onClick={() => this.handleClose()}>OK</Button>
  </div>
</Modal>
```

## Issues can't be fixed and may need other tasks to track it so that we will have more time to research the solutions and try to fix
---

* The dynamic added data can't been read out by the screen reader

    https://jirafnd.dev.activenetwork.com/browse/ANE-92415

    https://jirafnd.dev.activenetwork.com/browse/ANE-92386


* The disable session should't be read out, but can been read out by press the key of the downn arrow without focus on the disabled session

    https://jirafnd.dev.activenetwork.com/browse/ANE-92387


* If the child element(stopPropgation) is full of the link(a) element, with JAWS running, the Enter and Space key event will not trigger the click event of the link element, but if the link has padding set, the event can be triggered. Use button instead of the a will resolve it.

    https://jirafnd.dev.activenetwork.com/browse/ANE-92385

## French for the am/pm apply if needed
---
[By default, Moment.js comes with English (United States) locale strings. If you need other locales, you can load them into Moment.js for later use](https://momentjscom.readthedocs.io/en/latest/moment/06-i18n/01-changing-locale/)

[Telling Time in French](https://www.thoughtco.com/telling-time-in-french-lheure-1371397)

```
moment.locale('fr', {
    months : 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort : 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact : true,
    weekdays : 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort : 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin : 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
    weekdaysParseExact : true,
    longDateFormat : {
        LT : 'HH:mm',
        LTS : 'HH:mm:ss',
        L : 'DD/MM/YYYY',
        LL : 'D MMMM YYYY',
        LLL : 'D MMMM YYYY HH:mm',
        LLLL : 'dddd D MMMM YYYY HH:mm'
    },
    calendar : {
        sameDay : '[Aujourd’hui à] LT',
        nextDay : '[Demain à] LT',
        nextWeek : 'dddd [à] LT',
        lastDay : '[Hier à] LT',
        lastWeek : 'dddd [dernier à] LT',
        sameElse : 'L'
    },
    relativeTime : {
        future : 'dans %s',
        past : 'il y a %s',
        s : 'quelques secondes',
        m : 'une minute',
        mm : '%d minutes',
        h : 'une heure',
        hh : '%d heures',
        d : 'un jour',
        dd : '%d jours',
        M : 'un mois',
        MM : '%d mois',
        y : 'un an',
        yy : '%d ans'
    },
    dayOfMonthOrdinalParse : /\d{1,2}(er|e)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'e');
    },
    meridiemParse : /PD|MD/,
    isPM : function (input) {
        return input.charAt(0) === 'M';
    },
    // In case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example).
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // Used to determine first week of the year.
    }
});
```



