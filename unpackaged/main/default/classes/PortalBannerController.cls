public without sharing class PortalBannerController {
    @AuraEnabled(Cacheable=true)
    public static GW_Volunteers__Volunteer_Job__c getJobBannerData(Id recordId) {
        return [
                SELECT Id, Name, Job_header_image__c
                FROM GW_Volunteers__Volunteer_Job__c
                WHERE Id = :recordId
        ];
    }
}