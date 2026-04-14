//informed consent page
var informed_consent = {
    name: "研究参加同意書",
    title: "研究参加同意書",
    consent_text:
        "<p>研究者名：カリフォルニア大学ロサンゼルス校（UCLA）のエリサ・クライス教授（Dr. Elisa Kreiss）</p>" +
        "<p>資金提供：シェルマンフェローズ・プログラム（The Society of Hellman Fellows Program）</p>" +
        "<p>対象者：18 歳以上の方</p>" +
        "<br>"+
        "<p><strong>この研究について知っておくべきこと</strong></p>" +
        "<p>研究内容は説明されます</p>" +
        "<p>参加は任意です</p>" +
        "<p>同意後でも途中でやめることができます</p>" +
        "<p>参加・不参加の決定によって不利益を受けることはありません</p>" +
        "<p>質問があれば、事前に何でも聞いてください</p>" +
        "<p>答えたくない質問には答えなくても、研究への参加は継続できます</p>" +
        "<br>"+
        "<p><strong>研究の目的</strong></p>" +
        "<p>この研究は、人々が視覚的なシーンをどのように捉え、評価するのかを理解することを目的としています。画像の見方や感じ方を調べることで、人間のコミュニケーションの仕組みや視覚情報の処理について、より深い理解が得られると考えられます。</p>" +
        "<br>"+
        "<p><strong>研究の所要時間と手順</strong></p>" +
        "<p>所要時間：約10分</p>" +
        "<p>内容：5枚の画像が表示され、それぞれについて描写していただきます</p>" +
        "<p>その後、簡単な事後アンケートと、背景に関する質問に答えていただきます</p>" +
        "<br>"+
        "<p><strong>参加によるリスク</strong></p>" +
        "<p>参加により、予期されるリスクや不快感はありません</p>" +
        "<br>"+
        "<p><strong>参加による利益</strong></p>" +
        "<p> 直接的な利益はありませんが、あなたの参加は今後の研究に役立つ可能性があります</p>" +
        "<br>"+
        "<p><strong>プライバシー保護個人情報の取り扱い</strong></p>" +
        "<p>個人を特定できる情報は収集しません</p>" +
        "<p>収集されたデータは安全な場所に保管されます</p>" +
        "<p>匿名化されたデータは、研究の再現や追跡研究のために共有される可能性があります</p>" +
        "<p>研究チーム、UCLAの認可を受けた職員、研究スポンサーがデータにアクセスする可能性があります</p>" +
        "<p>公表される研究成果にあなたの名前が記載されることはありません</p>"+
        "<p>大学職員が処理の過程で情報にアクセスする場合がありますが、厳格な守秘義務があります</p>" +
        "<p>匿名化されたデータは無期限に保管されます</p>" +
        "<br>"+
        "<p><strong>連絡先</strong></p>" +
        "<p><strong>研究に関するお問い合わせ：</strong> 研究に関して質問や意見・不安がある場合は、研究チームまでご連絡ください: エリサ・クライス教授（Dr. Elisa Kreiss）へは、メール（ekreiss@ucla.edu）または電話（310-825-1703）でご連絡いただけます。</p>" +
        "<p><strong> 研究参加者としての権利に関するお問い合わせ：</strong> カリフォルニア大学ロサンゼルス校人間研究保護プログラム（UCLA OHRPP）電話：(310) 206-2040、メール：participants@research.ucla.edu、郵送：Box 951406, Los Angeles, CA 90095-1406</p>",
    render: function() {
        var viewTemplate = $("#informed-consent-view").html();
        
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                consent_text: this.consent_text
            })
        );

        var consentYes = $("#consent-yes");
        var consentNo = $("#consent-no");
        var nextButton = $("#next");

        // Function to enable/disable next button based on selection
        var updateNextButton = function() {
            if (consentYes.is(":checked") || consentNo.is(":checked")) {
                nextButton.prop("disabled", false);
            } else {
                nextButton.prop("disabled", true);
            }
        };

        // Event listeners for checkboxes
        consentYes.on("change", function() {
            if ($(this).is(":checked")) {
                consentNo.prop("checked", false);
            }
            updateNextButton();
        });

        consentNo.on("change", function() {
            if ($(this).is(":checked")) {
                consentYes.prop("checked", false);
            }
            updateNextButton();
        });

        // Next button click handler
        nextButton.on("click", function() {
            if (consentYes.is(":checked")) {
                // User consented, go to instructions
                exp.findNextView();
            } else if (consentNo.is(":checked")) {
                // User declined, go to thanks page
                exp.currentViewCounter = exp.views_seq.length - 1; // Go to last view (thanks)
                exp.currentTrialInViewCounter = 0;
                exp.findNextView();
            }
        });

        // Initially disable the next button
        nextButton.prop("disabled", true);
    },
    trials: 1
};

// introduction page
var intro = {
    name: "intro",
    // introduction title
    title: "説明", 
    // introduction text
    text:
        "<p>こんにちは。本研究にご参加いただきありがとうございます。</p><br><p>次のセクションでは、<strong>5枚の写真</strong>について記述していただきます。写真は1枚ずつ表示されます。記述にあたって、文字数や時間の制限はありません。必ずご自身で丁寧にご回答ください。他の場所から文章をコピー＆ペーストすることはお控えください。</p><br><p>写真の記述が終了しましたら、簡単な事後アンケートおよび、あなたの背景やご経験に関する質問にご回答いただきます。</p><br><p>準備ができましたら、下のボタンをクリックして実験を開始してください。</p>",
    buttonText: "実験開始",
    // render function renders the view
    render: function() {
        var viewTemplate = $("#intro-view").html();

        $("#main").html(
            Mustache.render(viewTemplate, {
                //picture: "stimuli/stanford-nlp-logo.jpg",
                title: this.title,
                text: this.text,
                legal_info: this.legal_info,
                button: this.buttonText
            })
        );

        var prolificId = $("#prolific-id");
        var IDform = $("#prolific-id-form");
        var next = $("#next");

        var showNextBtn = function() {
            if (prolificId.val().trim() !== "") {
                next.removeClass("nodisplay");
            } else {
                next.addClass("nodisplay");
            }
        };

        if (config_deploy.deployMethod !== "Prolific") {
            IDform.addClass("nodisplay");
            next.removeClass("nodisplay");
        }

        prolificId.on("keyup", function() {
            showNextBtn();
        });

        prolificId.on("focus", function() {
            showNextBtn();
        });

        // moves to the next view
        next.on("click", function() {
            if (config_deploy.deployMethod === "Prolific") {
                exp.global_data.prolific_id = prolificId.val().trim();
            }

            exp.findNextView();
        });
    },
    // for how many trials should this view be repeated?
    trials: 1
};

// main page
var main = {
    name: "main",
    render: function(CT) {
        // fill variables in view-template
        console.log('current trial');
        console.log(exp.trial_info.main_trials[CT]);
        var viewTemplate = $("#main-view").html();

        let focal = exp.trial_info.main_trials[CT]['focal'];
        let background = exp.trial_info.main_trials[CT]['background'];
        let filePath = exp.trial_info.main_trials[CT]['filePath'];
        console.log("filePath");
        console.log(filePath);
        let category = exp.trial_info.main_trials[CT]['category'];

       
        $("#main").html(
            Mustache.render(viewTemplate, {
                image_path: filePath,
                instruction: "この画像を、目の見えない方や視覚に障がいのある方に説明するつもりで記述してください"
            })
        );

        window.scrollTo(0,0);

        var startingTime = Date.now();
        var typing_record = "";

        var text_area = $('#description');
        var char_count_el = $('<span id="char_count" class="char-count" style="font-size:12px; color:#666; display:block; width:100%; text-align:right; margin-top:-22px; padding-right:5px;"></span>');
        text_area.after(char_count_el);


        text_area.on("keyup input", function() {
            var val = text_area.val();
            char_count_el.text(val.length + " 文字");
        });

        // Record only typed characters (not pasted), compatible with Japanese IME
        text_area.on("beforeinput", function(e) {
            var oe = e.originalEvent;
            if (!oe) return;
        
            // Ignore pasted content
            if (oe.inputType === "insertFromPaste") {
                return;
            }
        
            // Record typed characters (including IME Japanese)
            if (
                oe.inputType === "insertText" ||
                oe.inputType === "insertCompositionText"
            ) {
                if (oe.data) {
                    typing_record += oe.data;
                }
            }
        
            // Record Enter key
            if (oe.inputType === "insertLineBreak") {
                typing_record += "\n";
            }
        });

        // functions
        function responses_complete() {
            const description = $('#description').val().trim();
            return description.length > 0;
        };

        // var q1_resp = $('input[name=slider1]:checked').val();

        // event functions
        $("#next").on("click", function(e) {
            // when input is selected, response and additional info stored in exp.trial_info
            if (!responses_complete()) {
                $('#error').css({"display": "block"});
                // state = STATES.RESPOND;
                // respond_area.css({"display" : "inline"});
                // alt_text.css({"opacity": "1"});
                // comment_area.css({"display" : "inline"});
                // show_img.css({"display" : "block"});
                // instruction.text("Now answer the questions below!");
                // next.text("Continue!");
                // next.css({"display": "none"});
                // rt_article_read = Date.now();
            }
            else {
                rt_trial_done = Date.now();
                var timeDescribingSeconds = (rt_trial_done - startingTime) / 1000;
                var trial_data = {
                    trial_number: CT + 1,
                    focal: focal,
                    background: background,
                    category: category,
                    filepath: filePath,
                    description: $('#description').val().trim(),
                    description_typing_record: typing_record,
                    additional_notes: $('#image_additional_notes').val() ? $('#image_additional_notes').val().trim() : "",
                    time_describing_seconds: timeDescribingSeconds
                };
                // console.log("FIRST TIME LOGGING THINGS!");
                // console.log((rt_trial_done - startingTime) /1000);
                // console.log(trial_data);

                exp.trial_data.push(trial_data);
                exp.findNextView();
            }
        })

        // record trial starting time (startingTime set above with typing_record)
    },
    trials: 10
};

// Post-test page

var postTest = {
    name: "postTest",
    title: "調査後の質問",
    buttonText: "次へ進む",
    render: function() {
        var viewTemplate = $("#post-test-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title,
                text: this.text,
                buttonText: this.buttonText
            })
        );

        $("#next").on("click", function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // validation: check all required fields
            var famUs = $('input[name=fam_us]:checked').val();
            var famJp = $('input[name=fam_jp]:checked').val();
            var famVisual = $('input[name=fam_visual]:checked').val();
            var imgFam = $('input[name=img_familiar]:checked').val();
            
            // Check if img_familiar is "yes", then img_familiar_spec is also required
            var imgFamSpecRequired = (imgFam === 'yes' && $('#img_familiar_spec').val().trim() === '');

            if (!famUs || !famJp || !famVisual || !imgFam || imgFamSpecRequired) {
                $('#error').css({"display": "block"});
                return;
            }

            $('#error').css({"display": "none"});

            // records the post test info (page 1: familiarity + image familiarity)
            exp.global_data.familiar_us = famUs;
            exp.global_data.familiar_jp = famJp;
            exp.global_data.familiar_visual = famVisual;

            exp.global_data.image_familiar = imgFam;
            exp.global_data.image_familiar_spec = (imgFam === 'yes' ? $('#img_familiar_spec').val().trim() : "");

            // moves to the next view
            exp.findNextView();
        });
    },
    trials: 1
};

// Demographics & comments
var demographics = {
    name: "demographics",
    title: "回答者属性",
    buttonText: "次へ進む",
    render: function() {
        var viewTemplate = $("#demographics-view").html();
        $("#main").html(
            Mustache.render(viewTemplate, {
                title: this.title
            })
        );

        $("#next").on("click", function(e) {
            e.preventDefault();

            // validation: check all required fields (except post_comments)
            var gender = $('input[name=gender]:checked').val();
            var age = $('#age').val();
            var yearsLived = $('#years_lived').val();
            var vision = $('input[name=vision]:checked').val();
            var country = $('input[name=country]:checked').val();
            var nlangChecked = $('input[name=native_lang]:checked');
            var nlang = [];
            nlangChecked.each(function() {
                nlang.push($(this).val());
            });
            
            // Check if "other" is selected, then the corresponding text field is required
            var visionOtherRequired = (vision === 'other' && $('#vision_other').val().trim() === '');
            var countryOtherRequired = (country === 'other' && $('#country_other').val().trim() === '');
            var nlangOtherRequired = (nlang.includes('other') && $('#native_lang_other').val().trim() === '');

            if (!gender || !age || !yearsLived || !vision || !country || nlang.length === 0 || 
                visionOtherRequired || countryOtherRequired || nlangOtherRequired) {
                $('#error').css({"display": "block"});
                return;
            }

            $('#error').css({"display": "none"});

            // demographics
            exp.global_data.gender = gender;
            exp.global_data.age = age;
            exp.global_data.years_lived = yearsLived;
            exp.global_data.vision = vision;
            exp.global_data.vision_other = (vision === 'other' ? $('#vision_other').val().trim() : "");

            exp.global_data.country = country;
            exp.global_data.country_other = (country === 'other' ? $('#country_other').val().trim() : "");

            exp.global_data.native_lang = nlang;
            exp.global_data.native_lang_other = (nlang.includes('other') ? $('#native_lang_other').val().trim() : "");

            // comments (optional)
            exp.global_data.post_comments = $('#post_comments').val().trim();

            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent =
                (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // next
            exp.findNextView();
        });
    },
    trials: 1
};

var thanks = {
    name: "thanks",
    message: "この実験にご参加いただき、ありがとうございました！",
    render: function() {
        var viewTemplate = $("#thanks-view").html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if (
            config_deploy.is_MTurk ||
            config_deploy.deployMethod === "directLink"
        ) {
            // updates the fields in the hidden form with info for the MTurk's server
            $("#main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message
                })
            );
        } else if (config_deploy.deployMethod === "Prolific") {
            $("main").html(
                Mustache.render(viewTemplate, {
                    thanksMessage: this.message,
                    extraMessage:
                        "下のボタンを押して、Prolific で実験を完了したことを確認してください。あなたの完了コードは「C18RZW3G」です。<br/>" +
                        "<a href=" +
                        config_deploy.prolificURL +
                        ' class="prolific-url">確認</a>'
                })
            );
        } else if (config_deploy.deployMethod === "debug") {
            $("main").html(Mustache.render(viewTemplate, {}));
        } else {
            console.log("no such config_deploy.deployMethod");
        }

        exp.submit();
    },
    trials: 1
};
