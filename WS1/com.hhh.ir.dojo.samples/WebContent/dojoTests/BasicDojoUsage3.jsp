<html>
    <head>
    	<jsp:include page="/infraweb/hwti/helpers/addDojo.jsp"/>
        <title>Fun with Dijit!</title>
        <style type="text/css">
            h3 {
                margin : 10px;
            }
            label,input {
                display: block;
                float: left;
                margin-bottom: 5px;
            }
            label {
                text-align: right;
                width: 70px;
                padding-right: 20px;
            }
            br {
                clear: left;
            }
            .grouping {
                width:300px;
                border:solid 1px rgb(230,230,230);
                padding:5px;
                margin:10px;
            }
        </style>
        <script type="text/javascript">
            dojo.require("dojo.parser");
            dojo.require("dijit.form.TextBox");
            dojo.require("dijit.form.ValidationTextBox");
            dojo.require("dijit.form.Button");
        </script>
    </head>
    <body class="claro">
        <h3>Sign-up for our great offers:</h3>
        <form id="registration_form">
            <!-- Weave some widgets into the page by supplying the tags and including
            a dojoType attribute so the parser can find them and swap them out -->
            <div class="grouping">
                <label>First Name:</label>
                <input type="text"
                       maxlength=25
                       name="first"
                       dojoType="dijit.form.TextBox"
                       trim="true"
                       propercase="true"/><br>
                <label>Last Name:</label>
                <input type="text"
                       maxlength=25
                       name="last"
                       dojoType="dijit.form.TextBox"
                       trim="true"
                       propercase="true"/><br>
                <label>Your Email:</label>
                <input type="text"
                       maxlength=25
                       name="email"
                       dojoType="dijit.form.ValidationTextBox"
                       trim="true"
                       lowercase="true"
                       regExp="[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,4}"
                       required="true"
                       invalidMessage="Please enter a valid e-mail address"/><br>
                <button dojoType="dijit.form.Button"
                        onClick="alert('Boo!')">Sign Up!</button>
            </div>
        </form>
    </body>
</html>