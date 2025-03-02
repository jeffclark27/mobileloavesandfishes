@IsTest
private class PortalBannerControllerTest {
    @IsTest
    static void testGetJobBannerData() {
        Campaign newCampaign = new Campaign(Name = 'Test Campaign');
        insert newCampaign;
        GW_Volunteers__Volunteer_Job__c newJob = new GW_Volunteers__Volunteer_Job__c(
                Name = 'Test Job',
                Job_header_image__c = 'headerUrl',
                GW_Volunteers__Campaign__c = newCampaign.Id
        );
        insert newJob;
        GW_Volunteers__Volunteer_Job__c job = PortalBannerController.getJobBannerData(newJob.Id);
        System.assertEquals(job.Name, 'Test Job', 'Name should match');
        System.assertEquals(job.Job_header_image__c, 'headerUrl', 'Job_header_image__c should match');
    }
}