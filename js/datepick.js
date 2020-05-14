/*
 * @Author: singh Liu
 * @Date: 2020-05-13 16:44:17
 * @LastEditTime: 2020-05-14 17:22:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath:\html\singh4.28\datepick\js\datepick.js
 */
!function () {

    var datepick = {};

    /**
     * @description: 日期选择工具
     * @param： {new Date} year年份，month月份，默认为当前年月
     * @return: {object} date所有日期，showDate真实日期，currentMonth真实月份
     */
    datepick.getMonthDate = function (year, month) {

        var ret = [];
        //如果没有传入参数默则为当前年月
        if (!year || !month) {
            var date = new Date();
            year = date.getFullYear();
            month = date.getMonth() + 1;
        }

        /**
         *  根据日历格式将周日的返回值置为 7
         *  取得本月第一天为星期几
         */
        var fristDay = new Date(year, month - 1, 1);
        var FristDayISWeekDay = fristDay.getDay();
        if (FristDayISWeekDay === 0) FristDayISWeekDay = 7;

        /**
         * 当月的最后天是几号
         */
        var currentMonth = new Date(year, month, 0);
        var currentMonthLastDay = currentMonth.getDate();

        /**
         * 上个月的最后一天是多少号
         * 上个月的最后一天是星期几
         */
        var lastDay = new Date(year, month - 1, 0);
        var lastDayIsDate = lastDay.getDate();
        var lastDayISWeekDay = FristDayISWeekDay - 1;

        //取得今天是几年几月几号,不受传入参数影响
        var d = new Date();
        var toyear = d.getFullYear();
        var tomonth = d.getMonth() + 1;
        var today = d.getDate();
        tomonth = integer(tomonth);
        var toYearMonth = toyear + '-' + tomonth;
        /**
         *  遍历每个月的日期 将所有日期，真实日期，真实月份push到ret
         */
        for (var i = 0; i < 7 * 6; i++) {

            var date = i + 1 - lastDayISWeekDay;
            var showDate = date;
            var currentMonth = month;

            //判断是否为上月日期
            if (date <= 0) {

                showDate = lastDayIsDate + date;
                currentMonth = month - 1;

                //判断是否为下月日期
            } else if (date > currentMonthLastDay) {

                showDate = date - currentMonthLastDay;
                currentMonth = month + 1;

            }

            //月份重置
            if (currentMonth === 0) { currentMonth = 12 }
            if (currentMonth > 12) { currentMonth = 0 }

            ret.push({
                today: today,
                date: date,
                showDate: showDate,
                currentMonth: currentMonth,
            });

        }

        //月份取整
        function integer(month) {

            if (month < 10) {
                return '0' + month;
            }
            return month;
        }

        month = integer(month);

        return {
            toDay: { toYearMonth: toYearMonth, today: today, currentMonthLastDay: currentMonthLastDay},
            year: year,
            month: month,
            days: ret,
            
        };

    };

    window.datepick = datepick;


}()