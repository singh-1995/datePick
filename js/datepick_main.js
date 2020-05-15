
!function () {

    /**
    * @description:数据渲染，模板输出
    * @return:{string} html文档结构
    */
    var main;
    var dateMonth;
    var datepick = window.datepick;
    //渲染页面
    datepick.biuldUi = function (yaer, month) {

        dateMonth = datepick.getMonthDate(yaer, month);

        var html = '<div class="date-pick-head">' +
            '<button class="date-but bate-prev-but" >&lt;</button>' +
            '<p class="date-pick-time"><time>' + dateMonth.year + '-' + dateMonth.month + '</time></p>' +
            '<button class="date-but bate-next-but">&gt;</button>' +
            '</div >' +
            '<div class="date-pick-body">' +
            '<table class="date-pick-table">' +
            '<thead class="date-pick-thead">' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>日</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < dateMonth.days.length; i++) {
            var date = dateMonth.days[i];
            if (i % 7 === 0) {
                html += '<tr>';
            }
            html += '<td data-Day="' + date.date + '">' + date.showDate + '</td>';
            if (i % 7 === 6) {
                html += '</tr>';
            }
        }

        html += '</tbody>' +
            '</table>' +
            '</div>';
        return html;

    }
    //重绘
    datepick.render = function (direction) {

        var y, m;

        if (dateMonth) {
            y = dateMonth.year;
            m = dateMonth.month;
        }

        if (direction == 'prev') m--;
        if (direction == 'next') m++;

        if (m < 1) {
            m = 12;
            y--;
        }
        if (m > 12) {
            m = 1;
            y++;
        }

        var html = datepick.biuldUi(y, m);

        if (!main) {
            main = document.createElement('main');
            main.className = 'date-main';
            document.body.appendChild(main);
        }
        main.innerHTML = html;

        //标注今天的日期
        var td = document.querySelectorAll('td');
        var time = document.querySelector('time');
        var len = td.length;

        for (var i = 0; i < len; i++) {

            var date = dateMonth;
            //判断是否为今天
            if ((date.days[i].showDate === date.toDay.today) && (date.toDay.toYearMonth === time.innerHTML)) {
                td[i].classList.add('datepick-today');
            }
            //判断是否为非本月真实日期
            if ((date.days[i].date <= 0) || date.days[i].date > date.toDay.currentMonthLastDay) {
                td[i].classList.add('fakeDay');
            }



        }

    };
    //初始化
    datepick.init = function (inp) {

        datepick.render();

        var input = document.querySelector(inp);
        var state = false;


        function sezi() {
            var left = input.offsetLeft;
            var top = input.offsetTop;
            var height = input.offsetHeight;
            main.style.top = top + height + 2 + 'px';
            main.style.left = left + 'px';
            main.classList.add('date-main-active');
        }
        sezi()
        window.addEventListener('resize', function () {
            sezi()
        })
        var t = input.getAttribute("placeholder");
        input.addEventListener('focus', function () {
            if (t !== "undefined" || t !== null || t !== "") {
                input.setAttribute("placeholder", " ");
            }
        })

        input.addEventListener('blur', function () {
            if (t !== "undefined" || t !== null || t !== "") {
                input.setAttribute("placeholder", t);
                if (input.classList.contains('placeError')) {
                    input.classList.remove('placeError');
                }

            }
        })

        var but = document.querySelector('.date-pick-button');
        but.addEventListener('click', function () {

            var text = input.value;
            var RE = /^((0?[1-9])|((1|2)[0-9])|30|31)$/;

            if (!RE.test(text)) {
                var Error = '请输入正确的日期格式...';
                input.value = "";
                input.classList.add('placeError');
                input.setAttribute("placeholder", Error)
            } else {
                var day = input.value;
                logDay(day)

            }
        })
        //输出查询日期
        function logDay(day) {
            var d = day;
            var date = new Date(dateMonth.year, dateMonth.month, d);
            var week = date.getDay();
            var y = date.getFullYear(),
                m = date.getMonth();
            d = date.getDate();
            d = (d < 10 && d > 0) ? '0' + d : d;
            var weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            for (var i = 0; i < weekArr.length; i++) {
                if (week === i) {
                    input.value = "";
                    input.value += y + '年' + m + '月' + d + '日是' + weekArr[i] + '^_^.';
                    input.classList.add('inputDay');
                }
            }
        }
        main.addEventListener('click', function (e) {

            var target = e.target;
            if (!target.classList.contains('date-but')) return;

            if (target.classList.contains('bate-prev-but')) {

                datepick.render('prev');

            }
            if (target.classList.contains('bate-next-but')) {

                datepick.render('next');

            }
        })

        main.addEventListener('click', function (e) {
            var target = e.target;
            var dateDay = target.dataset.day;
            if (target.nodeName.toLowerCase() !== 'td') return;
            dateDay = (dateDay < 10 && dateDay > 0) ? '0' + dateDay : dateDay;
            logDay(dateDay);
            //获取年月日
            // var date = new Date(dateMonth.year, dateMonth.month-1, dateDay)
            // input.value = format(date);

            // main.classList.remove('date-main-active');
            // state = false;
        })
    };

    //     const format = (date) => {

    //         var ret = '';

    //         //月份取整
    //         function integer(month) {

    //             if (month < 10) {
    //                 return '0' + month;
    //             }
    //             return month;
    //         }

    //         ret += date.getFullYear() + '-';
    //         ret += integer(date.getMonth()) + '-';
    //         ret += integer(date.getDate());

    //         return ret;

    // };
}()
