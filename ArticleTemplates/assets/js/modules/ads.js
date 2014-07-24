/*global window,document,console,define */
define([
    'modules/$'
], function (
    $
) {
    'use strict';

    var tabletMpuId = 'advert-mpu-content',
        mobileMpuId = 'advert-mobile-mpu-content',
        bannerHtmlId = 'advert-banner-content',

        modules = {
            addGoogleTags: function (config) {
                var googletag = window.googletag = window.googletag || {};
                googletag.cmd = window.googletag.cmd || [];

                var gads = document.createElement('script'),
                    useSSL = 'https:' === document.location.protocol,
                    node = document.getElementsByTagName('script')[0];

                gads.async = true;
                gads.type = 'text/javascript';
                gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
                node.parentNode.insertBefore(gads, node);

                var windowWidth = window.innerWidth,
                    bannerWidth = 900,
                    bannerHeight = 250;

                if (windowWidth < 300) {
                    bannerWidth = 216;
                    bannerHeight = 36;
                }

                if (windowWidth < 728 && windowWidth >= 300) {
                    bannerWidth = 300;
                    bannerHeight = 50;
                }

                if (windowWidth < 900 && windowWidth >= 728) {
                    bannerWidth = 728;
                    bannerHeight = 90;
                }

                googletag.cmd.push(function () {
                    googletag.defineSlot(config.adsSlot, [[300, 250]], tabletMpuId).addService(googletag.pubads());
                    googletag.defineSlot(config.adsSlot, [[300, 250]], mobileMpuId).addService(googletag.pubads());
                    googletag.defineSlot(config.adsSlot, [[bannerWidth, bannerHeight]], bannerHtmlId).addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.pubads().setTargeting('k', eval(config.adsKeywordTargeting));
                    googletag.enableServices();
                });
            },

            insertAds: function (config) {
                var googletag = window.googletag,
                    windowWidth = window.innerWidth;
                
                var counter = 0;
                
                $(".article__body > div > *:nth-child(-n+3)").each(function() {
                    
                    var tagName = $(this)[0].tagName;
                    
                    if (tagName == "P" || tagName == "H2" || tagName == "BLOCKQUOTE") {
                        counter++;
                    } else if (tagName == "FIGURE" && $(this).hasClass("element-placeholder") || $(this).hasClass("element-video")) {
                        counter++;
                    }
                    
                });

                if (config.adsConfig == "tablet" && counter == 3) {
                    var tabletMpuHtml = "<div class='advert-slot advert-slot--mpu advert-slot--mpu--tablet'>" +
                                            "<div class='advert-slot__label'>Advertisement</div>" +
                                            "<div class='advert-slot__wrapper'>" +
                                                "<div class='advert-slot__wrapper__content' id=" + tabletMpuId + "></div>" +
                                            "</div>" +
                                        "</div>";

                    $(".article__body > div > p:nth-of-type(1)").before(tabletMpuHtml);

                    googletag.cmd.push(function () {
                        googletag.display(tabletMpuId);
                    });

                } else if (config.adsConfig == "mobile") {
                    var mobileMpuHtml = "<div class='advert-slot advert-slot--mpu advert-slot--mpu--mobile'>" +
                                            "<div class='advert-slot__label'>Advertisement</div>" +
                                            "<div class='advert-slot__wrapper'>" +
                                                "<div class='advert-slot__wrapper__content' id=" + mobileMpuId + "></div>" +
                                            "</div>" +
                                        "</div>",

                        bannerHtml =  "<div class='advert-slot__wrapper__content' id=" + bannerHtmlId + "></div>";

                    $(".article__body > div > p:nth-of-type(6)").after(mobileMpuHtml);
                    $(".advert-slot__wrapper").prepend(bannerHtml);

                    googletag.cmd.push(function () {
                        googletag.display(mobileMpuId);
                        googletag.display(bannerHtmlId);
                    });
                }
            }
        },

        ready = function (config) {
            if (!this.initialised) {
                this.initialised = true;
                
                if (config.adsEnabled == "true") {
                    modules.addGoogleTags(config);
                    modules.insertAds(config);
                } 
                // console.info("Ads ready");
            }
        };

    return {
        init: ready
    };

});
