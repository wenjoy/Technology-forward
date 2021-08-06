import React from 'react';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { Link as Anchor, Element, scroller } from 'react-scroll';
import Events from './Events';
import generateDateRange from './utils';

export default class DayViewScrollable extends React.Component {
  static displayName = 'DayViewScrollable';

  constructor(props) {
    super(props);
    this.scrollDelay = props.scrollDelay;
    this.updateTriggeredByElementActive = false;
    this.isAutoScroll = false;
  }

  shouldComponentUpdate(nextProps) {
    return !nextProps.currentDate.isSame(this.props.currentDate)
      || nextProps.eventsMap !== this.props.eventsMap;
  }

  componentDidUpdate(previousProps) {
    if (!previousProps.currentDate.isSame(this.props.currentDate)) {
      this.scrollToDate();
    }
  }

  scrollToDate=() => {
    const { currentDate, containerId, offset } = this.props;
    if (this.updateTriggeredByElementActive) {
      this.updateTriggeredByElementActive = false;
    } else {
      this.isAutoScroll = true;

      // use timestamp as anchor
      const anchor = currentDate.valueOf();
      scroller.scrollTo(anchor, { containerId, offset });
    }
  }

  setDateOnScroll = debounce((date) => {
    if (this.isAutoScroll) {
      this.isAutoScroll = false;
    } else {
      this.updateTriggeredByElementActive = true;
      this.props.updateDate(moment(date));
    }
  }, this.scrollDelay)

  render() {
    const { prefixCls, minDate, maxDate, containerId, offset, ...rest } = this.props;
    const dates = generateDateRange(minDate, maxDate);
    return (
      <div
        className={`${prefixCls}__day`}
      >
        {dates.length > 0 ?
            dates.map((d) => {
              const anchor = d.valueOf();
              return (<div>
                <Element name={anchor}>
                  <Events date={d} prefixCls={prefixCls} {...rest} />
                  <Anchor
                    spy
                    to={anchor}
                    containerId={containerId}
                    onSetActive={this.setDateOnScroll}
                    offset={offset}
                  />
                </Element>
              </div>);
            })
         : null}
      </div>
    );
  }
}
