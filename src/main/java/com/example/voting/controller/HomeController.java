package com.example.voting.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index(Model model) {
        System.out.println("Accessed Home Page");
        model.addAttribute("pageTitle", "Home - Blockchain Voting");
        return "index";
    }
}
