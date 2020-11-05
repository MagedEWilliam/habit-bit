import { Component, Event, Element, Watch, State,Prop, h } from "@stencil/core";
import moment from 'moment';


@Component({
  tag: 'year-calendar',
  styleUrl: 'year-calendar.css'
})
export class YearCalendar {

  @Prop() displayDate = moment().format("YYYY-MM-DDTHH:mm:ssTZD");
  @Prop() zoom = false;
  @Prop() change = ()=>{};
  
  @Element() comp;

  componentDidRender() {
    if(!moment(this.displayDate, "YYYY-MM-DDTHH:mm:ssTZD").isLeapYear()){
      this.comp.querySelector('.leap').style.display = 'none'
    }
    if(this.zoom){
      this.comp.classList.add('zoom-in')
      if(this.comp.querySelector('.selected')){
        setTimeout(()=>{
          this.comp.querySelector('.selected').scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
        }, 300, this)
      }
    }else{
      this.comp.classList.remove('zoom-in')
    }
  }

  render() {
    return (<div width="325" height="800" class="year">
      <span class="month">
        <p class="month-title" fill="#CECECE">jan</p>
        <div class="day date-2020-1-1" date="2020-1-1" year="2020" month="1" day="1"><p>1</p></div>
        <div class="day date-2020-1-2" date="2020-1-2" year="2020" month="1" day="2"><p>2</p></div>
        <div class="day date-2020-1-3" date="2020-1-3" year="2020" month="1" day="3"><p>3</p></div>
        <div class="day date-2020-1-4" date="2020-1-4" year="2020" month="1" day="4"><p>4</p></div>
        <div class="day date-2020-1-5" date="2020-1-5" year="2020" month="1" day="5"><p>5</p></div>
        <div class="day date-2020-1-6" date="2020-1-6" year="2020" month="1" day="6"><p>6</p></div>
        <div class="day date-2020-1-7" date="2020-1-7" year="2020" month="1" day="7"><p>7</p></div>
        <div class="day date-2020-1-8" date="2020-1-8" year="2020" month="1" day="8"><p>8</p></div>
        <div class="day date-2020-1-9" date="2020-1-9" year="2020" month="1" day="9"><p>9</p></div>
        <div class="day date-2020-1-10" date="2020-1-10" year="2020" month="1" day="10"><p>10</p></div>
        <div class="day date-2020-1-11" date="2020-1-11" year="2020" month="1" day="11"><p>11</p></div>
        <div class="day date-2020-1-12" date="2020-1-12" year="2020" month="1" day="12"><p>12</p></div>
        <div class="day date-2020-1-13" date="2020-1-13" year="2020" month="1" day="13"><p>13</p></div>
        <div class="day date-2020-1-14" date="2020-1-14" year="2020" month="1" day="14"><p>14</p></div>
        <div class="day date-2020-1-15" date="2020-1-15" year="2020" month="1" day="15"><p>15</p></div>
        <div class="day date-2020-1-16" date="2020-1-16" year="2020" month="1" day="16"><p>16</p></div>
        <div class="day date-2020-1-17" date="2020-1-17" year="2020" month="1" day="17"><p>17</p></div>
        <div class="day date-2020-1-18" date="2020-1-18" year="2020" month="1" day="18"><p>18</p></div>
        <div class="day date-2020-1-19" date="2020-1-19" year="2020" month="1" day="19"><p>19</p></div>
        <div class="day date-2020-1-20" date="2020-1-20" year="2020" month="1" day="20"><p>20</p></div>
        <div class="day date-2020-1-21" date="2020-1-21" year="2020" month="1" day="21"><p>21</p></div>
        <div class="day date-2020-1-22" date="2020-1-22" year="2020" month="1" day="22"><p>22</p></div>
        <div class="day date-2020-1-23" date="2020-1-23" year="2020" month="1" day="23"><p>23</p></div>
        <div class="day date-2020-1-24" date="2020-1-24" year="2020" month="1" day="24"><p>24</p></div>
        <div class="day date-2020-1-25" date="2020-1-25" year="2020" month="1" day="25"><p>25</p></div>
        <div class="day date-2020-1-26" date="2020-1-26" year="2020" month="1" day="26"><p>26</p></div>
        <div class="day date-2020-1-27" date="2020-1-27" year="2020" month="1" day="27"><p>27</p></div>
        <div class="day date-2020-1-28" date="2020-1-28" year="2020" month="1" day="28"><p>28</p></div>
        <div class="day date-2020-1-29" date="2020-1-29" year="2020" month="1" day="29"><p>29</p></div>
        <div class="day date-2020-1-30" date="2020-1-30" year="2020" month="1" day="30"><p>30</p></div>
        <div class="day date-2020-1-31" date="2020-1-31" year="2020" month="1" day="31"><p>31</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">feb</p>
        <div class="day date-2020-2-1" date="2020-2-1" year="2020" month="2" day="1"><p>1</p></div>
        <div class="day date-2020-2-2" date="2020-2-2" year="2020" month="2" day="2"><p>2</p></div>
        <div class="day date-2020-2-3" date="2020-2-3" year="2020" month="2" day="3"><p>3</p></div>
        <div class="day date-2020-2-4" date="2020-2-4" year="2020" month="2" day="4"><p>4</p></div>
        <div class="day date-2020-2-5" date="2020-2-5" year="2020" month="2" day="5"><p>5</p></div>
        <div class="day date-2020-2-6" date="2020-2-6" year="2020" month="2" day="6"><p>6</p></div>
        <div class="day date-2020-2-7" date="2020-2-7" year="2020" month="2" day="7"><p>7</p></div>
        <div class="day date-2020-2-8" date="2020-2-8" year="2020" month="2" day="8"><p>8</p></div>
        <div class="day date-2020-2-9" date="2020-2-9" year="2020" month="2" day="9"><p>9</p></div>
        <div class="day date-2020-2-10" date="2020-2-10" year="2020" month="2" day="10"><p>10</p></div>
        <div class="day date-2020-2-11" date="2020-2-11" year="2020" month="2" day="11"><p>11</p></div>
        <div class="day date-2020-2-12" date="2020-2-12" year="2020" month="2" day="12"><p>12</p></div>
        <div class="day date-2020-2-13" date="2020-2-13" year="2020" month="2" day="13"><p>13</p></div>
        <div class="day date-2020-2-14" date="2020-2-14" year="2020" month="2" day="14"><p>14</p></div>
        <div class="day date-2020-2-15" date="2020-2-15" year="2020" month="2" day="15"><p>15</p></div>
        <div class="day date-2020-2-16" date="2020-2-16" year="2020" month="2" day="16"><p>16</p></div>
        <div class="day date-2020-2-17" date="2020-2-17" year="2020" month="2" day="17"><p>17</p></div>
        <div class="day date-2020-2-18" date="2020-2-18" year="2020" month="2" day="18"><p>18</p></div>
        <div class="day date-2020-2-19" date="2020-2-19" year="2020" month="2" day="19"><p>19</p></div>
        <div class="day date-2020-2-20" date="2020-2-20" year="2020" month="2" day="20"><p>20</p></div>
        <div class="day date-2020-2-21" date="2020-2-21" year="2020" month="2" day="21"><p>21</p></div>
        <div class="day date-2020-2-22" date="2020-2-22" year="2020" month="2" day="22"><p>22</p></div>
        <div class="day date-2020-2-23" date="2020-2-23" year="2020" month="2" day="23"><p>23</p></div>
        <div class="day date-2020-2-24" date="2020-2-24" year="2020" month="2" day="24"><p>24</p></div>
        <div class="day date-2020-2-25" date="2020-2-25" year="2020" month="2" day="25"><p>25</p></div>
        <div class="day date-2020-2-26" date="2020-2-26" year="2020" month="2" day="26"><p>26</p></div>
        <div class="day date-2020-2-27" date="2020-2-27" year="2020" month="2" day="27"><p>27</p></div>
        <div class="day date-2020-2-28" date="2020-2-28" year="2020" month="2" day="28"><p>28</p></div>
        <div class="day date-2020-2-29 leap" date="2020-2-29" year="2020" month="2" day="29"><p>29</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">mar</p>
        <div class="day date-2020-3-1" date="2020-3-1" year="2020" month="3" day="1"><p>1</p></div>
        <div class="day date-2020-3-2" date="2020-3-2" year="2020" month="3" day="2"><p>2</p></div>
        <div class="day date-2020-3-3" date="2020-3-3" year="2020" month="3" day="3"><p>3</p></div>
        <div class="day date-2020-3-4" date="2020-3-4" year="2020" month="3" day="4"><p>4</p></div>
        <div class="day date-2020-3-5" date="2020-3-5" year="2020" month="3" day="5"><p>5</p></div>
        <div class="day date-2020-3-6" date="2020-3-6" year="2020" month="3" day="6"><p>6</p></div>
        <div class="day date-2020-3-7" date="2020-3-7" year="2020" month="3" day="7"><p>7</p></div>
        <div class="day date-2020-3-8" date="2020-3-8" year="2020" month="3" day="8"><p>8</p></div>
        <div class="day date-2020-3-9" date="2020-3-9" year="2020" month="3" day="9"><p>9</p></div>
        <div class="day date-2020-3-10" date="2020-3-10" year="2020" month="3" day="10"><p>10</p></div>
        <div class="day date-2020-3-11" date="2020-3-11" year="2020" month="3" day="11"><p>11</p></div>
        <div class="day date-2020-3-12" date="2020-3-12" year="2020" month="3" day="12"><p>12</p></div>
        <div class="day date-2020-3-13" date="2020-3-13" year="2020" month="3" day="13"><p>13</p></div>
        <div class="day date-2020-3-14" date="2020-3-14" year="2020" month="3" day="14"><p>14</p></div>
        <div class="day date-2020-3-15" date="2020-3-15" year="2020" month="3" day="15"><p>15</p></div>
        <div class="day date-2020-3-16" date="2020-3-16" year="2020" month="3" day="16"><p>16</p></div>
        <div class="day date-2020-3-17" date="2020-3-17" year="2020" month="3" day="17"><p>17</p></div>
        <div class="day date-2020-3-18" date="2020-3-18" year="2020" month="3" day="18"><p>18</p></div>
        <div class="day date-2020-3-19" date="2020-3-19" year="2020" month="3" day="19"><p>19</p></div>
        <div class="day date-2020-3-20" date="2020-3-20" year="2020" month="3" day="20"><p>20</p></div>
        <div class="day date-2020-3-21" date="2020-3-21" year="2020" month="3" day="21"><p>21</p></div>
        <div class="day date-2020-3-22" date="2020-3-22" year="2020" month="3" day="22"><p>22</p></div>
        <div class="day date-2020-3-23" date="2020-3-23" year="2020" month="3" day="23"><p>23</p></div>
        <div class="day date-2020-3-24" date="2020-3-24" year="2020" month="3" day="24"><p>24</p></div>
        <div class="day date-2020-3-25" date="2020-3-25" year="2020" month="3" day="25"><p>25</p></div>
        <div class="day date-2020-3-26" date="2020-3-26" year="2020" month="3" day="26"><p>26</p></div>
        <div class="day date-2020-3-27" date="2020-3-27" year="2020" month="3" day="27"><p>27</p></div>
        <div class="day date-2020-3-28" date="2020-3-28" year="2020" month="3" day="28"><p>28</p></div>
        <div class="day date-2020-3-29" date="2020-3-29" year="2020" month="3" day="29"><p>29</p></div>
        <div class="day date-2020-3-30" date="2020-3-30" year="2020" month="3" day="30"><p>30</p></div>
        <div class="day date-2020-3-31" date="2020-3-31" year="2020" month="3" day="31"><p>31</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">apr</p>
        <div class="day date-2020-4-1" date="2020-4-1" year="2020" month="4" day="1"><p>1</p></div>
        <div class="day date-2020-4-2" date="2020-4-2" year="2020" month="4" day="2"><p>2</p></div>
        <div class="day date-2020-4-3" date="2020-4-3" year="2020" month="4" day="3"><p>3</p></div>
        <div class="day date-2020-4-4" date="2020-4-4" year="2020" month="4" day="4"><p>4</p></div>
        <div class="day date-2020-4-5" date="2020-4-5" year="2020" month="4" day="5"><p>5</p></div>
        <div class="day date-2020-4-6" date="2020-4-6" year="2020" month="4" day="6"><p>6</p></div>
        <div class="day date-2020-4-7" date="2020-4-7" year="2020" month="4" day="7"><p>7</p></div>
        <div class="day date-2020-4-8" date="2020-4-8" year="2020" month="4" day="8"><p>8</p></div>
        <div class="day date-2020-4-9" date="2020-4-9" year="2020" month="4" day="9"><p>9</p></div>
        <div class="day date-2020-4-10" date="2020-4-10" year="2020" month="4" day="10"><p>10</p></div>
        <div class="day date-2020-4-11" date="2020-4-11" year="2020" month="4" day="11"><p>11</p></div>
        <div class="day date-2020-4-12" date="2020-4-12" year="2020" month="4" day="12"><p>12</p></div>
        <div class="day date-2020-4-13" date="2020-4-13" year="2020" month="4" day="13"><p>13</p></div>
        <div class="day date-2020-4-14" date="2020-4-14" year="2020" month="4" day="14"><p>14</p></div>
        <div class="day date-2020-4-15" date="2020-4-15" year="2020" month="4" day="15"><p>15</p></div>
        <div class="day date-2020-4-16" date="2020-4-16" year="2020" month="4" day="16"><p>16</p></div>
        <div class="day date-2020-4-17" date="2020-4-17" year="2020" month="4" day="17"><p>17</p></div>
        <div class="day date-2020-4-18" date="2020-4-18" year="2020" month="4" day="18"><p>18</p></div>
        <div class="day date-2020-4-19" date="2020-4-19" year="2020" month="4" day="19"><p>19</p></div>
        <div class="day date-2020-4-20" date="2020-4-20" year="2020" month="4" day="20"><p>20</p></div>
        <div class="day date-2020-4-21" date="2020-4-21" year="2020" month="4" day="21"><p>21</p></div>
        <div class="day date-2020-4-22" date="2020-4-22" year="2020" month="4" day="22"><p>22</p></div>
        <div class="day date-2020-4-23" date="2020-4-23" year="2020" month="4" day="23"><p>23</p></div>
        <div class="day date-2020-4-24" date="2020-4-24" year="2020" month="4" day="24"><p>24</p></div>
        <div class="day date-2020-4-25" date="2020-4-25" year="2020" month="4" day="25"><p>25</p></div>
        <div class="day date-2020-4-26" date="2020-4-26" year="2020" month="4" day="26"><p>26</p></div>
        <div class="day date-2020-4-27" date="2020-4-27" year="2020" month="4" day="27"><p>27</p></div>
        <div class="day date-2020-4-28" date="2020-4-28" year="2020" month="4" day="28"><p>28</p></div>
        <div class="day date-2020-4-29" date="2020-4-29" year="2020" month="4" day="29"><p>29</p></div>
        <div class="day date-2020-4-30" date="2020-4-30" year="2020" month="4" day="30"><p>30</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">may</p>
        <div class="day date-2020-5-1" date="2020-5-1" year="2020" month="5" day="1"><p>1</p></div>
        <div class="day date-2020-5-2" date="2020-5-2" year="2020" month="5" day="2"><p>2</p></div>
        <div class="day date-2020-5-3" date="2020-5-3" year="2020" month="5" day="3"><p>3</p></div>
        <div class="day date-2020-5-4" date="2020-5-4" year="2020" month="5" day="4"><p>4</p></div>
        <div class="day date-2020-5-5" date="2020-5-5" year="2020" month="5" day="5"><p>5</p></div>
        <div class="day date-2020-5-6" date="2020-5-6" year="2020" month="5" day="6"><p>6</p></div>
        <div class="day date-2020-5-7" date="2020-5-7" year="2020" month="5" day="7"><p>7</p></div>
        <div class="day date-2020-5-8" date="2020-5-8" year="2020" month="5" day="8"><p>8</p></div>
        <div class="day date-2020-5-9" date="2020-5-9" year="2020" month="5" day="9"><p>9</p></div>
        <div class="day date-2020-5-10" date="2020-5-10" year="2020" month="5" day="10"><p>10</p></div>
        <div class="day date-2020-5-11" date="2020-5-11" year="2020" month="5" day="11"><p>11</p></div>
        <div class="day date-2020-5-12" date="2020-5-12" year="2020" month="5" day="12"><p>12</p></div>
        <div class="day date-2020-5-13" date="2020-5-13" year="2020" month="5" day="13"><p>13</p></div>
        <div class="day date-2020-5-14" date="2020-5-14" year="2020" month="5" day="14"><p>14</p></div>
        <div class="day date-2020-5-15" date="2020-5-15" year="2020" month="5" day="15"><p>15</p></div>
        <div class="day date-2020-5-16" date="2020-5-16" year="2020" month="5" day="16"><p>16</p></div>
        <div class="day date-2020-5-17" date="2020-5-17" year="2020" month="5" day="17"><p>17</p></div>
        <div class="day date-2020-5-18" date="2020-5-18" year="2020" month="5" day="18"><p>18</p></div>
        <div class="day date-2020-5-19" date="2020-5-19" year="2020" month="5" day="19"><p>19</p></div>
        <div class="day date-2020-5-20" date="2020-5-20" year="2020" month="5" day="20"><p>20</p></div>
        <div class="day date-2020-5-21" date="2020-5-21" year="2020" month="5" day="21"><p>21</p></div>
        <div class="day date-2020-5-22" date="2020-5-22" year="2020" month="5" day="22"><p>22</p></div>
        <div class="day date-2020-5-23" date="2020-5-23" year="2020" month="5" day="23"><p>23</p></div>
        <div class="day date-2020-5-24" date="2020-5-24" year="2020" month="5" day="24"><p>24</p></div>
        <div class="day date-2020-5-25" date="2020-5-25" year="2020" month="5" day="25"><p>25</p></div>
        <div class="day date-2020-5-26" date="2020-5-26" year="2020" month="5" day="26"><p>26</p></div>
        <div class="day date-2020-5-27" date="2020-5-27" year="2020" month="5" day="27"><p>27</p></div>
        <div class="day date-2020-5-28" date="2020-5-28" year="2020" month="5" day="28"><p>28</p></div>
        <div class="day date-2020-5-29" date="2020-5-29" year="2020" month="5" day="29"><p>29</p></div>
        <div class="day date-2020-5-30" date="2020-5-30" year="2020" month="5" day="30"><p>30</p></div>
        <div class="day date-2020-5-31" date="2020-5-31" year="2020" month="5" day="31"><p>31</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">jun</p>
        <div class="day date-2020-6-1" date="2020-6-1" year="2020" month="6" day="1"><p>1</p></div>
        <div class="day date-2020-6-2" date="2020-6-2" year="2020" month="6" day="2"><p>2</p></div>
        <div class="day date-2020-6-3" date="2020-6-3" year="2020" month="6" day="3"><p>3</p></div>
        <div class="day date-2020-6-4" date="2020-6-4" year="2020" month="6" day="4"><p>4</p></div>
        <div class="day date-2020-6-5" date="2020-6-5" year="2020" month="6" day="5"><p>5</p></div>
        <div class="day date-2020-6-6" date="2020-6-6" year="2020" month="6" day="6"><p>6</p></div>
        <div class="day date-2020-6-7" date="2020-6-7" year="2020" month="6" day="7"><p>7</p></div>
        <div class="day date-2020-6-8" date="2020-6-8" year="2020" month="6" day="8"><p>8</p></div>
        <div class="day date-2020-6-9" date="2020-6-9" year="2020" month="6" day="9"><p>9</p></div>
        <div class="day date-2020-6-10" date="2020-6-10" year="2020" month="6" day="10"><p>10</p></div>
        <div class="day date-2020-6-11" date="2020-6-11" year="2020" month="6" day="11"><p>11</p></div>
        <div class="day date-2020-6-12" date="2020-6-12" year="2020" month="6" day="12"><p>12</p></div>
        <div class="day date-2020-6-13" date="2020-6-13" year="2020" month="6" day="13"><p>13</p></div>
        <div class="day date-2020-6-14" date="2020-6-14" year="2020" month="6" day="14"><p>14</p></div>
        <div class="day date-2020-6-15" date="2020-6-15" year="2020" month="6" day="15"><p>15</p></div>
        <div class="day date-2020-6-16" date="2020-6-16" year="2020" month="6" day="16"><p>16</p></div>
        <div class="day date-2020-6-17" date="2020-6-17" year="2020" month="6" day="17"><p>17</p></div>
        <div class="day date-2020-6-18" date="2020-6-18" year="2020" month="6" day="18"><p>18</p></div>
        <div class="day date-2020-6-19" date="2020-6-19" year="2020" month="6" day="19"><p>19</p></div>
        <div class="day date-2020-6-20" date="2020-6-20" year="2020" month="6" day="20"><p>20</p></div>
        <div class="day date-2020-6-21" date="2020-6-21" year="2020" month="6" day="21"><p>21</p></div>
        <div class="day date-2020-6-22" date="2020-6-22" year="2020" month="6" day="22"><p>22</p></div>
        <div class="day date-2020-6-23" date="2020-6-23" year="2020" month="6" day="23"><p>23</p></div>
        <div class="day date-2020-6-24" date="2020-6-24" year="2020" month="6" day="24"><p>24</p></div>
        <div class="day date-2020-6-25" date="2020-6-25" year="2020" month="6" day="25"><p>25</p></div>
        <div class="day date-2020-6-26" date="2020-6-26" year="2020" month="6" day="26"><p>26</p></div>
        <div class="day date-2020-6-27" date="2020-6-27" year="2020" month="6" day="27"><p>27</p></div>
        <div class="day date-2020-6-28" date="2020-6-28" year="2020" month="6" day="28"><p>28</p></div>
        <div class="day date-2020-6-29" date="2020-6-29" year="2020" month="6" day="29"><p>29</p></div>
        <div class="day date-2020-6-30" date="2020-6-30" year="2020" month="6" day="30"><p>30</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">jul</p>
        <div class="day date-2020-7-1" date="2020-7-1" year="2020" month="7" day="1"><p>1</p></div>
        <div class="day date-2020-7-2" date="2020-7-2" year="2020" month="7" day="2"><p>2</p></div>
        <div class="day date-2020-7-3" date="2020-7-3" year="2020" month="7" day="3"><p>3</p></div>
        <div class="day date-2020-7-4" date="2020-7-4" year="2020" month="7" day="4"><p>4</p></div>
        <div class="day date-2020-7-5" date="2020-7-5" year="2020" month="7" day="5"><p>5</p></div>
        <div class="day date-2020-7-6" date="2020-7-6" year="2020" month="7" day="6"><p>6</p></div>
        <div class="day date-2020-7-7" date="2020-7-7" year="2020" month="7" day="7"><p>7</p></div>
        <div class="day date-2020-7-8" date="2020-7-8" year="2020" month="7" day="8"><p>8</p></div>
        <div class="day date-2020-7-9" date="2020-7-9" year="2020" month="7" day="9"><p>9</p></div>
        <div class="day date-2020-7-10" date="2020-7-10" year="2020" month="7" day="10"><p>10</p></div>
        <div class="day date-2020-7-11" date="2020-7-11" year="2020" month="7" day="11"><p>11</p></div>
        <div class="day date-2020-7-12" date="2020-7-12" year="2020" month="7" day="12"><p>12</p></div>
        <div class="day date-2020-7-13" date="2020-7-13" year="2020" month="7" day="13"><p>13</p></div>
        <div class="day date-2020-7-14" date="2020-7-14" year="2020" month="7" day="14"><p>14</p></div>
        <div class="day date-2020-7-15" date="2020-7-15" year="2020" month="7" day="15"><p>15</p></div>
        <div class="day date-2020-7-16" date="2020-7-16" year="2020" month="7" day="16"><p>16</p></div>
        <div class="day date-2020-7-17" date="2020-7-17" year="2020" month="7" day="17"><p>17</p></div>
        <div class="day date-2020-7-18" date="2020-7-18" year="2020" month="7" day="18"><p>18</p></div>
        <div class="day date-2020-7-19" date="2020-7-19" year="2020" month="7" day="19"><p>19</p></div>
        <div class="day date-2020-7-20" date="2020-7-20" year="2020" month="7" day="20"><p>20</p></div>
        <div class="day date-2020-7-21" date="2020-7-21" year="2020" month="7" day="21"><p>21</p></div>
        <div class="day date-2020-7-22" date="2020-7-22" year="2020" month="7" day="22"><p>22</p></div>
        <div class="day date-2020-7-23" date="2020-7-23" year="2020" month="7" day="23"><p>23</p></div>
        <div class="day date-2020-7-24" date="2020-7-24" year="2020" month="7" day="24"><p>24</p></div>
        <div class="day date-2020-7-25" date="2020-7-25" year="2020" month="7" day="25"><p>25</p></div>
        <div class="day date-2020-7-26" date="2020-7-26" year="2020" month="7" day="26"><p>26</p></div>
        <div class="day date-2020-7-27" date="2020-7-27" year="2020" month="7" day="27"><p>27</p></div>
        <div class="day date-2020-7-28" date="2020-7-28" year="2020" month="7" day="28"><p>28</p></div>
        <div class="day date-2020-7-29" date="2020-7-29" year="2020" month="7" day="29"><p>29</p></div>
        <div class="day date-2020-7-30" date="2020-7-30" year="2020" month="7" day="30"><p>30</p></div>
        <div class="day date-2020-7-31" date="2020-7-31" year="2020" month="7" day="31"><p>31</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">aug</p>
        <div class="day date-2020-8-1" date="2020-8-1" year="2020" month="8" day="1"><p>1</p></div>
        <div class="day date-2020-8-2" date="2020-8-2" year="2020" month="8" day="2"><p>2</p></div>
        <div class="day date-2020-8-3" date="2020-8-3" year="2020" month="8" day="3"><p>3</p></div>
        <div class="day date-2020-8-4" date="2020-8-4" year="2020" month="8" day="4"><p>4</p></div>
        <div class="day date-2020-8-5" date="2020-8-5" year="2020" month="8" day="5"><p>5</p></div>
        <div class="day date-2020-8-6" date="2020-8-6" year="2020" month="8" day="6"><p>6</p></div>
        <div class="day date-2020-8-7" date="2020-8-7" year="2020" month="8" day="7"><p>7</p></div>
        <div class="day date-2020-8-8" date="2020-8-8" year="2020" month="8" day="8"><p>8</p></div>
        <div class="day date-2020-8-9" date="2020-8-9" year="2020" month="8" day="9"><p>9</p></div>
        <div class="day date-2020-8-10" date="2020-8-10" year="2020" month="8" day="10"><p>10</p></div>
        <div class="day date-2020-8-11" date="2020-8-11" year="2020" month="8" day="11"><p>11</p></div>
        <div class="day date-2020-8-12" date="2020-8-12" year="2020" month="8" day="12"><p>12</p></div>
        <div class="day date-2020-8-13" date="2020-8-13" year="2020" month="8" day="13"><p>13</p></div>
        <div class="day date-2020-8-14" date="2020-8-14" year="2020" month="8" day="14"><p>14</p></div>
        <div class="day date-2020-8-15" date="2020-8-15" year="2020" month="8" day="15"><p>15</p></div>
        <div class="day date-2020-8-16" date="2020-8-16" year="2020" month="8" day="16"><p>16</p></div>
        <div class="day date-2020-8-17" date="2020-8-17" year="2020" month="8" day="17"><p>17</p></div>
        <div class="day date-2020-8-18" date="2020-8-18" year="2020" month="8" day="18"><p>18</p></div>
        <div class="day date-2020-8-19" date="2020-8-19" year="2020" month="8" day="19"><p>19</p></div>
        <div class="day date-2020-8-20" date="2020-8-20" year="2020" month="8" day="20"><p>20</p></div>
        <div class="day date-2020-8-21" date="2020-8-21" year="2020" month="8" day="21"><p>21</p></div>
        <div class="day date-2020-8-22" date="2020-8-22" year="2020" month="8" day="22"><p>22</p></div>
        <div class="day date-2020-8-23" date="2020-8-23" year="2020" month="8" day="23"><p>23</p></div>
        <div class="day date-2020-8-24" date="2020-8-24" year="2020" month="8" day="24"><p>24</p></div>
        <div class="day date-2020-8-25" date="2020-8-25" year="2020" month="8" day="25"><p>25</p></div>
        <div class="day date-2020-8-26" date="2020-8-26" year="2020" month="8" day="26"><p>26</p></div>
        <div class="day date-2020-8-27" date="2020-8-27" year="2020" month="8" day="27"><p>27</p></div>
        <div class="day date-2020-8-28" date="2020-8-28" year="2020" month="8" day="28"><p>28</p></div>
        <div class="day date-2020-8-29" date="2020-8-29" year="2020" month="8" day="29"><p>29</p></div>
        <div class="day date-2020-8-30" date="2020-8-30" year="2020" month="8" day="30"><p>30</p></div>
        <div class="day date-2020-8-31" date="2020-8-31" year="2020" month="8" day="31"><p>31</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">sep</p>
        <div class="day date-2020-9-1" date="2020-9-1" year="2020" month="9" day="1"><p>1</p></div>
        <div class="day date-2020-9-2" date="2020-9-2" year="2020" month="9" day="2"><p>2</p></div>
        <div class="day date-2020-9-3" date="2020-9-3" year="2020" month="9" day="3"><p>3</p></div>
        <div class="day date-2020-9-4" date="2020-9-4" year="2020" month="9" day="4"><p>4</p></div>
        <div class="day date-2020-9-5" date="2020-9-5" year="2020" month="9" day="5"><p>5</p></div>
        <div class="day date-2020-9-6" date="2020-9-6" year="2020" month="9" day="6"><p>6</p></div>
        <div class="day date-2020-9-7" date="2020-9-7" year="2020" month="9" day="7"><p>7</p></div>
        <div class="day date-2020-9-8" date="2020-9-8" year="2020" month="9" day="8"><p>8</p></div>
        <div class="day date-2020-9-9" date="2020-9-9" year="2020" month="9" day="9"><p>9</p></div>
        <div class="day date-2020-9-10" date="2020-9-10" year="2020" month="9" day="10"><p>10</p></div>
        <div class="day date-2020-9-11" date="2020-9-11" year="2020" month="9" day="11"><p>11</p></div>
        <div class="day date-2020-9-12" date="2020-9-12" year="2020" month="9" day="12"><p>12</p></div>
        <div class="day date-2020-9-13" date="2020-9-13" year="2020" month="9" day="13"><p>13</p></div>
        <div class="day date-2020-9-14" date="2020-9-14" year="2020" month="9" day="14"><p>14</p></div>
        <div class="day date-2020-9-15" date="2020-9-15" year="2020" month="9" day="15"><p>15</p></div>
        <div class="day date-2020-9-16" date="2020-9-16" year="2020" month="9" day="16"><p>16</p></div>
        <div class="day date-2020-9-17" date="2020-9-17" year="2020" month="9" day="17"><p>17</p></div>
        <div class="day date-2020-9-18" date="2020-9-18" year="2020" month="9" day="18"><p>18</p></div>
        <div class="day date-2020-9-19" date="2020-9-19" year="2020" month="9" day="19"><p>19</p></div>
        <div class="day date-2020-9-20" date="2020-9-20" year="2020" month="9" day="20"><p>20</p></div>
        <div class="day date-2020-9-21" date="2020-9-21" year="2020" month="9" day="21"><p>21</p></div>
        <div class="day date-2020-9-22" date="2020-9-22" year="2020" month="9" day="22"><p>22</p></div>
        <div class="day date-2020-9-23" date="2020-9-23" year="2020" month="9" day="23"><p>23</p></div>
        <div class="day date-2020-9-24" date="2020-9-24" year="2020" month="9" day="24"><p>24</p></div>
        <div class="day date-2020-9-25" date="2020-9-25" year="2020" month="9" day="25"><p>25</p></div>
        <div class="day date-2020-9-26" date="2020-9-26" year="2020" month="9" day="26"><p>26</p></div>
        <div class="day date-2020-9-27" date="2020-9-27" year="2020" month="9" day="27"><p>27</p></div>
        <div class="day date-2020-9-28" date="2020-9-28" year="2020" month="9" day="28"><p>28</p></div>
        <div class="day date-2020-9-29" date="2020-9-29" year="2020" month="9" day="29"><p>29</p></div>
        <div class="day date-2020-9-30" date="2020-9-30" year="2020" month="9" day="30"><p>30</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">oct</p>
        <div class="day date-2020-10-1" date="2020-10-1" year="2020" month="10" day="1"><p>1</p></div>
        <div class="day date-2020-10-2" date="2020-10-2" year="2020" month="10" day="2"><p>2</p></div>
        <div class="day date-2020-10-3" date="2020-10-3" year="2020" month="10" day="3"><p>3</p></div>
        <div class="day date-2020-10-4" date="2020-10-4" year="2020" month="10" day="4"><p>4</p></div>
        <div class="day date-2020-10-5" date="2020-10-5" year="2020" month="10" day="5"><p>5</p></div>
        <div class="day date-2020-10-6" date="2020-10-6" year="2020" month="10" day="6"><p>6</p></div>
        <div class="day date-2020-10-7" date="2020-10-7" year="2020" month="10" day="7"><p>7</p></div>
        <div class="day date-2020-10-8" date="2020-10-8" year="2020" month="10" day="8"><p>8</p></div>
        <div class="day date-2020-10-9" date="2020-10-9" year="2020" month="10" day="9"><p>9</p></div>
        <div class="day date-2020-10-10" date="2020-10-10" year="2020" month="10" day="10"><p>10</p></div>
        <div class="day date-2020-10-11" date="2020-10-11" year="2020" month="10" day="11"><p>11</p></div>
        <div class="day date-2020-10-12" date="2020-10-12" year="2020" month="10" day="12"><p>12</p></div>
        <div class="day date-2020-10-13" date="2020-10-13" year="2020" month="10" day="13"><p>13</p></div>
        <div class="day date-2020-10-14" date="2020-10-14" year="2020" month="10" day="14"><p>14</p></div>
        <div class="day date-2020-10-15" date="2020-10-15" year="2020" month="10" day="15"><p>15</p></div>
        <div class="day date-2020-10-16" date="2020-10-16" year="2020" month="10" day="16"><p>16</p></div>
        <div class="day date-2020-10-17" date="2020-10-17" year="2020" month="10" day="17"><p>17</p></div>
        <div class="day date-2020-10-18" date="2020-10-18" year="2020" month="10" day="18"><p>18</p></div>
        <div class="day date-2020-10-19" date="2020-10-19" year="2020" month="10" day="19"><p>19</p></div>
        <div class="day date-2020-10-20" date="2020-10-20" year="2020" month="10" day="20"><p>20</p></div>
        <div class="day date-2020-10-21" date="2020-10-21" year="2020" month="10" day="21"><p>21</p></div>
        <div class="day date-2020-10-22" date="2020-10-22" year="2020" month="10" day="22"><p>22</p></div>
        <div class="day date-2020-10-23" date="2020-10-23" year="2020" month="10" day="23"><p>23</p></div>
        <div class="day date-2020-10-24" date="2020-10-24" year="2020" month="10" day="24"><p>24</p></div>
        <div class="day date-2020-10-25" date="2020-10-25" year="2020" month="10" day="25"><p>25</p></div>
        <div class="day date-2020-10-26" date="2020-10-26" year="2020" month="10" day="26"><p>26</p></div>
        <div class="day date-2020-10-27" date="2020-10-27" year="2020" month="10" day="27"><p>27</p></div>
        <div class="day date-2020-10-28" date="2020-10-28" year="2020" month="10" day="28"><p>28</p></div>
        <div class="day date-2020-10-29" date="2020-10-29" year="2020" month="10" day="29"><p>29</p></div>
        <div class="day date-2020-10-30" date="2020-10-30" year="2020" month="10" day="30"><p>30</p></div>
        <div class="day date-2020-10-31" date="2020-10-31" year="2020" month="10" day="31"><p>31</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">nov</p>
        <div class="day date-2020-11-1" date="2020-11-1" year="2020" month="11" day="1"><p>1</p></div>
        <div class="day date-2020-11-2" date="2020-11-2" year="2020" month="11" day="2"><p>2</p></div>
        <div class="day date-2020-11-3" date="2020-11-3" year="2020" month="11" day="3"><p>3</p></div>
        <div class="day date-2020-11-4" date="2020-11-4" year="2020" month="11" day="4"><p>4</p></div>
        <div class="day date-2020-11-5" date="2020-11-5" year="2020" month="11" day="5"><p>5</p></div>
        <div class="day date-2020-11-6" date="2020-11-6" year="2020" month="11" day="6"><p>6</p></div>
        <div class="day date-2020-11-7" date="2020-11-7" year="2020" month="11" day="7"><p>7</p></div>
        <div class="day date-2020-11-8" date="2020-11-8" year="2020" month="11" day="8"><p>8</p></div>
        <div class="day date-2020-11-9" date="2020-11-9" year="2020" month="11" day="9"><p>9</p></div>
        <div class="day date-2020-11-10" date="2020-11-10" year="2020" month="11" day="10"><p>10</p></div>
        <div class="day date-2020-11-11" date="2020-11-11" year="2020" month="11" day="11"><p>11</p></div>
        <div class="day date-2020-11-12" date="2020-11-12" year="2020" month="11" day="12"><p>12</p></div>
        <div class="day date-2020-11-13" date="2020-11-13" year="2020" month="11" day="13"><p>13</p></div>
        <div class="day date-2020-11-14" date="2020-11-14" year="2020" month="11" day="14"><p>14</p></div>
        <div class="day date-2020-11-15" date="2020-11-15" year="2020" month="11" day="15"><p>15</p></div>
        <div class="day date-2020-11-16" date="2020-11-16" year="2020" month="11" day="16"><p>16</p></div>
        <div class="day date-2020-11-17" date="2020-11-17" year="2020" month="11" day="17"><p>17</p></div>
        <div class="day date-2020-11-18" date="2020-11-18" year="2020" month="11" day="18"><p>18</p></div>
        <div class="day date-2020-11-19" date="2020-11-19" year="2020" month="11" day="19"><p>19</p></div>
        <div class="day date-2020-11-20" date="2020-11-20" year="2020" month="11" day="20"><p>20</p></div>
        <div class="day date-2020-11-21" date="2020-11-21" year="2020" month="11" day="21"><p>21</p></div>
        <div class="day date-2020-11-22" date="2020-11-22" year="2020" month="11" day="22"><p>22</p></div>
        <div class="day date-2020-11-23" date="2020-11-23" year="2020" month="11" day="23"><p>23</p></div>
        <div class="day date-2020-11-24" date="2020-11-24" year="2020" month="11" day="24"><p>24</p></div>
        <div class="day date-2020-11-25" date="2020-11-25" year="2020" month="11" day="25"><p>25</p></div>
        <div class="day date-2020-11-26" date="2020-11-26" year="2020" month="11" day="26"><p>26</p></div>
        <div class="day date-2020-11-27" date="2020-11-27" year="2020" month="11" day="27"><p>27</p></div>
        <div class="day date-2020-11-28" date="2020-11-28" year="2020" month="11" day="28"><p>28</p></div>
        <div class="day date-2020-11-29" date="2020-11-29" year="2020" month="11" day="29"><p>29</p></div>
        <div class="day date-2020-11-30" date="2020-11-30" year="2020" month="11" day="30"><p>30</p></div>
      </span>
      <span class="month">
        <p class="month-title" fill="#CECECE">dec</p>
        <div class="day date-2020-12-1" date="2020-12-1" year="2020" month="12" day="1"><p>1</p></div>
        <div class="day date-2020-12-2" date="2020-12-2" year="2020" month="12" day="2"><p>2</p></div>
        <div class="day date-2020-12-3" date="2020-12-3" year="2020" month="12" day="3"><p>3</p></div>
        <div class="day date-2020-12-4" date="2020-12-4" year="2020" month="12" day="4"><p>4</p></div>
        <div class="day date-2020-12-5" date="2020-12-5" year="2020" month="12" day="5"><p>5</p></div>
        <div class="day date-2020-12-6" date="2020-12-6" year="2020" month="12" day="6"><p>6</p></div>
        <div class="day date-2020-12-7" date="2020-12-7" year="2020" month="12" day="7"><p>7</p></div>
        <div class="day date-2020-12-8" date="2020-12-8" year="2020" month="12" day="8"><p>8</p></div>
        <div class="day date-2020-12-9" date="2020-12-9" year="2020" month="12" day="9"><p>9</p></div>
        <div class="day date-2020-12-10" date="2020-12-10" year="2020" month="12" day="10"><p>10</p></div>
        <div class="day date-2020-12-11" date="2020-12-11" year="2020" month="12" day="11"><p>11</p></div>
        <div class="day date-2020-12-12" date="2020-12-12" year="2020" month="12" day="12"><p>12</p></div>
        <div class="day date-2020-12-13" date="2020-12-13" year="2020" month="12" day="13"><p>13</p></div>
        <div class="day date-2020-12-14" date="2020-12-14" year="2020" month="12" day="14"><p>14</p></div>
        <div class="day date-2020-12-15" date="2020-12-15" year="2020" month="12" day="15"><p>15</p></div>
        <div class="day date-2020-12-16" date="2020-12-16" year="2020" month="12" day="16"><p>16</p></div>
        <div class="day date-2020-12-17" date="2020-12-17" year="2020" month="12" day="17"><p>17</p></div>
        <div class="day date-2020-12-18" date="2020-12-18" year="2020" month="12" day="18"><p>18</p></div>
        <div class="day date-2020-12-19" date="2020-12-19" year="2020" month="12" day="19"><p>19</p></div>
        <div class="day date-2020-12-20" date="2020-12-20" year="2020" month="12" day="20"><p>20</p></div>
        <div class="day date-2020-12-21" date="2020-12-21" year="2020" month="12" day="21"><p>21</p></div>
        <div class="day date-2020-12-22" date="2020-12-22" year="2020" month="12" day="22"><p>22</p></div>
        <div class="day date-2020-12-23" date="2020-12-23" year="2020" month="12" day="23"><p>23</p></div>
        <div class="day date-2020-12-24" date="2020-12-24" year="2020" month="12" day="24"><p>24</p></div>
        <div class="day date-2020-12-25" date="2020-12-25" year="2020" month="12" day="25"><p>25</p></div>
        <div class="day date-2020-12-26" date="2020-12-26" year="2020" month="12" day="26"><p>26</p></div>
        <div class="day date-2020-12-27" date="2020-12-27" year="2020" month="12" day="27"><p>27</p></div>
        <div class="day date-2020-12-28" date="2020-12-28" year="2020" month="12" day="28"><p>28</p></div>
        <div class="day date-2020-12-29" date="2020-12-29" year="2020" month="12" day="29"><p>29</p></div>
        <div class="day date-2020-12-30" date="2020-12-30" year="2020" month="12" day="30"><p>30</p></div>
        <div class="day date-2020-12-31" date="2020-12-31" year="2020" month="12" day="31"><p>31</p></div>
      </span>
    </div>
    );
  }

  disconnectedCallback() {
    setTimeout(() => {
      this.router.removeEventListener('ionRouteDidChange', this.routeChanged)
    }, 500)
  }
}