// --------------------------------------------------------------------------------------------------------------------
// <copyright file="GetItemUrl.cs" company="Sitecore Corporation A/S">
//     © 2016 Sitecore Corporation A/S. All rights reserved.
// </copyright>
// <summary>
//     Defines the GetItemUrl type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------
using Sitecore.Data.Items;
using Sitecore.ExperienceEditor.Speak.Server.Requests;
using Sitecore.ExperienceEditor.Speak.Server.Responses;
using Sitecore.Links;
using Sitecore.Text;
using Sitecore.XA.Foundation.Editing.Requests.Contexts;

namespace Sitecore.Support.XA.Foundation.Editing.Requests
{
    public class GetItemUrl : PipelineProcessorRequest<TargetContext>
    {
        protected Item TargetItem => RequestContext.TargetItem;

        public override PipelineProcessorResponseValue ProcessRequest()
        {
            UrlString targetUrl = new UrlString("/");
            targetUrl.Add("sc_mode", "edit");
            targetUrl.Add("sc_itemid", TargetItem.ID.ToString());
            targetUrl.Add("sc_lang", RequestContext.Language);
            #region SITECORE SUPPORT PATCH 13030
            // Fix is removing:targetUrl.Add("sc_version", RequestContext.Version);
            #endregion
            targetUrl.Append("sc_site", RequestContext.SiteName);

            return new PipelineProcessorResponseValue { Value = @"/?" + targetUrl.Query };
        }
    }
}
