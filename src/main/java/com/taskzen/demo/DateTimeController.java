package com.taskzen.demo;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.Locale;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DateTimeController {
    @GetMapping("/datetime")
    public Map<String, String> getDateTime() {
        ZonedDateTime now = ZonedDateTime.now();

        String day = now.getDayOfWeek()
                        .getDisplayName(TextStyle.FULL, Locale.ENGLISH)
                        .toUpperCase();
        String month = now.format(DateTimeFormatter.ofPattern("MMMM"));
        int dayOfMonth = now.getDayOfMonth();
        String suffix = getDaySuffix(dayOfMonth);
        String time = now.format(DateTimeFormatter.ofPattern("hh:mm a"));

        String dateTime = month + " " + dayOfMonth + suffix + " - " + time;

        return Map.of(
                "day", day,
                "dateTime", dateTime
        );
    }

    private String getDaySuffix(int day) {
        if (day >= 11 && day <= 13) return "th";
        else if(day % 10 == 1) return "st";
        else if(day % 10 == 2) return "nd";
        else if(day % 10 == 3) return "rd";
        else return "th";
    }
}