import { api, LightningElement, wire } from "lwc";
import basePath from '@salesforce/community/basePath';
import getJobBannerData from "@salesforce/apex/PortalBannerController.getJobBannerData";

export default class PortalJobDetailBanner extends LightningElement {

  // --- Public Properties ---

  @api recordId;
  @api backgroundImage;
  @api invertColor = false;

  // --- Private Properties ---

  headerText;
  recordBackgroundImage;

  // --- Wire Methods ---

  @wire(getJobBannerData, { recordId: "$recordId" })
  wireBannerData({ data, error }) {
    if (data) {
      this.headerText = data?.Name;
      this.recordBackgroundImage = data?.Job_header_image__c;
    } else if (error) {
      console.error('wireBannerData', error);
    }
  }
  // --- Getters ---

  /**
   * Checks if the image is a URL or Static Resource and returns a background style.
   * @returns {string}
   */
  get imageStyle() {
    const bgImage = this.recordBackgroundImage || this.backgroundImage;
    if (bgImage) {
      const isUrl = bgImage?.startsWith("http");
      const path = isUrl
        ? bgImage
        : `${basePath}/sfsites/c/resource/${bgImage}`;
      const colorStyle = this.invertColor ? " color: #000;" : "";
      return `background-image: url(${path});${colorStyle}`;
    }

    return "";
  }

}