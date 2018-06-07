define(["sitecore", "/-/speak/v1/ExperienceEditor/ExperienceEditor.js", "/-/speak/v1/ExperienceEditor/sxaHelper.js", "/-/speak/v1/Presentation/Presentation.js"], function (Sitecore, ExperienceEditor, SxaHelper, presentation) {
    Sitecore.Commands.PartialDesignDropDown =
    {
        canExecute: function (context) {
            if (context.currentContext.value && SxaHelper.Helpers.isId(context.currentContext.value)) {
                requestContext = context.app.clone(context.currentContext);
                requestContext.target = context.currentContext.value;
                requestContext.template = presentation.templates.PartialDesign;
                var canEdit = context.app.canExecute("ExperienceEditor.XA.CanEditFields", requestContext);
                return canEdit;
            } else {
                var requestContext = context.app.clone(context.currentContext);
                requestContext.target = "$partialDesigns";
                var exists = context.app.canExecute("ExperienceEditor.XA.DoesItemExist", requestContext);
                var canEdit = context.app.canExecute("ExperienceEditor.XA.CanEditFields", requestContext);
                return exists && canEdit;
            }
        },
        execute: function (context) {
            ExperienceEditor.modifiedHandling(true, function () {
                var requestContext = context.app.clone(context.currentContext);
                requestContext.target = context.currentContext.argument;
                ExperienceEditor.PipelinesUtil.generateRequestProcessor("ExperienceEditor.XA.GetItemUrl", function (response) {
                    if (response.responseValue.value) {
                        window.parent.location = ExperienceEditor.Web.removeQueryStringParameter(response.responseValue.value, "sc_version");
                    }
                }, requestContext).execute(context);
            });
        },
    };
});