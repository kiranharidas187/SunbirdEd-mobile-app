import { Inject, Injectable } from '@angular/core';
import {
    CorrelationData,
    Rollup,
    TelemetryEndRequest,
    TelemetryErrorRequest,
    TelemetryImpressionRequest,
    TelemetryInteractRequest,
    TelemetryAuditRequest,
    TelemetryLogRequest,
    TelemetryObject,
    TelemetryService,
    TelemetryStartRequest,
    TelemetryInterruptRequest,
    DeviceSpecification,
    Actor,
    AuditState
} from 'sunbird-sdk';
import { Map } from '../app/telemetryutil';
import { Environment, ImpressionType, InteractSubtype, InteractType, Mode, PageId, CorReleationDataType, ID } from './telemetry-constants';
import { MimeType } from '../app/app.constant';
import { ContentUtil } from '@app/util/content-util';

@Injectable()
export class TelemetryGeneratorService {
    constructor(@Inject('TELEMETRY_SERVICE') private telemetryService: TelemetryService) {
    }

    generateAuditTelemetry(env, currentSate?, updatedProperties?, objId?, objType?, objVer?, correlationData?) {
        const telemetryAuditRequest: TelemetryAuditRequest = {
            env: env ? env : undefined,
            currentState: currentSate ? currentSate : undefined,
            updatedProperties: updatedProperties ? updatedProperties : undefined,
            objId: objId ? objId: undefined,
            objType: objType ? objType : undefined,
            objVer: objVer ? objVer : undefined,
            correlationData: correlationData ? correlationData : undefined,
            actor: new Actor()
        };
        this.telemetryService.audit(telemetryAuditRequest).subscribe();
    }

    generateInteractTelemetry(interactType, interactSubtype, env, pageId, object?: TelemetryObject, values?: Map,
                              rollup?: Rollup, corRelationList?: Array<CorrelationData>, id?: string) {
        const telemetryInteractRequest = new TelemetryInteractRequest();
        telemetryInteractRequest.type = interactType;
        telemetryInteractRequest.subType = interactSubtype;
        telemetryInteractRequest.pageId = pageId;
        telemetryInteractRequest.id = id ? id : pageId;
        telemetryInteractRequest.env = env;
        if (values !== null) {
            telemetryInteractRequest.valueMap = values;
        }
        if (rollup !== undefined) {
            telemetryInteractRequest.rollup = rollup;
        }
        if (corRelationList !== undefined) {
            telemetryInteractRequest.correlationData = corRelationList;
        }

        if (object && object.id) {
            telemetryInteractRequest.objId = object.id;
        }

        if (object && object.type) {
            telemetryInteractRequest.objType = object.type;
        }

        if (object && object.version) {
            telemetryInteractRequest.objVer = object.version + '';
        }
        this.telemetryService.interact(telemetryInteractRequest).subscribe();
    }

    generateImpressionTelemetry(type, subtype, pageid, env, objectId?: string, objectType?: string,
        objectVersion?: string, rollup?: Rollup, corRelationList?: Array<CorrelationData>) {
        const telemetryImpressionRequest = new TelemetryImpressionRequest();
        telemetryImpressionRequest.type = type;
        telemetryImpressionRequest.subType = subtype;
        telemetryImpressionRequest.pageId = pageid;
        telemetryImpressionRequest.env = env;
        telemetryImpressionRequest.objId = objectId ? objectId : '';
        telemetryImpressionRequest.objType = objectType ? objectType : '';
        telemetryImpressionRequest.objVer = objectVersion ? objectVersion + '' : '';

        if (rollup !== undefined) {
            telemetryImpressionRequest.rollup = rollup;
        }
        if (corRelationList !== undefined) {
            telemetryImpressionRequest.correlationData = corRelationList;
        }
        this.telemetryService.impression(telemetryImpressionRequest).subscribe();
    }

    generateEndTelemetry(type, mode, pageId, env, object?: TelemetryObject, rollup?: Rollup, corRelationList?: Array<CorrelationData>) {
        const telemetryEndRequest = new TelemetryEndRequest();
        telemetryEndRequest.type = type;
        telemetryEndRequest.pageId = pageId;
        telemetryEndRequest.env = env;
        telemetryEndRequest.mode = mode;
        if (object && object.id) {
            telemetryEndRequest.objId = object.id;
        }

        if (object && object.type) {
            telemetryEndRequest.objType = object.type;
        }

        if (object && object.version) {
            telemetryEndRequest.objVer = object.version + '';
        }
        if (rollup) {
            telemetryEndRequest.rollup = rollup;
        }
        if (corRelationList) {
            telemetryEndRequest.correlationData = corRelationList;
        }
        this.telemetryService.end(telemetryEndRequest).subscribe();
    }

    generateStartTelemetry(pageId, object?: TelemetryObject, rollup?: Rollup, corRelationList?: Array<CorrelationData>) {
        const telemetryStartRequest = new TelemetryStartRequest();
        telemetryStartRequest.type = object.type;
        telemetryStartRequest.pageId = pageId;
        telemetryStartRequest.mode = Mode.PLAY;
        if (object && object.id) {
            telemetryStartRequest.objId = object.id;
        }

        if (object && object.type) {
            telemetryStartRequest.objType = object.type;
        }

        if (object && object.version) {
            telemetryStartRequest.objVer = object.version + '';
        }
        if (rollup !== undefined) {
            telemetryStartRequest.rollup = rollup;
        }
        if (corRelationList !== undefined) {
            telemetryStartRequest.correlationData = corRelationList;
        }

        this.telemetryService.start(telemetryStartRequest).subscribe();
    }

    generateLogEvent(logLevel, message, env, type, params: Array<any>) {
        const telemetryLogRequest = new TelemetryLogRequest();
        telemetryLogRequest.level = logLevel;
        telemetryLogRequest.message = message;
        telemetryLogRequest.env = env;
        telemetryLogRequest.type = type;
        telemetryLogRequest.params = params;
        this.telemetryService.log(telemetryLogRequest).subscribe();
    }
    genererateAppStartTelemetry(deviceSpec: DeviceSpecification) {
        const telemetryStartRequest = new TelemetryStartRequest();
        telemetryStartRequest.type = 'app';
        telemetryStartRequest.env = 'home';
        telemetryStartRequest.deviceSpecification = deviceSpec;
        this.telemetryService.start(telemetryStartRequest).subscribe();
    }

    generateInterruptTelemetry(type, pageId) {
        const telemetryInterruptRequest = new TelemetryInterruptRequest();
        telemetryInterruptRequest.pageId = pageId;
        telemetryInterruptRequest.type = type;
        this.telemetryService.interrupt(telemetryInterruptRequest).subscribe();
    }

    generateErrorTelemetry(env, errCode, errorType, pageId, stackTrace) {
        const telemetryErrorRequest = new TelemetryErrorRequest();
        // telemetryErrorRequest.env = env;
        telemetryErrorRequest.errorCode = errCode;
        telemetryErrorRequest.errorType = errorType;
        telemetryErrorRequest.pageId = pageId;
        telemetryErrorRequest.stacktrace = stackTrace;
        this.telemetryService.error(telemetryErrorRequest).subscribe();
    }

    generateBackClickedTelemetry(pageId, env, isNavBack: boolean, identifier?: string, corRelationList?, objRollup?, telemetryObject?) {
        const values = new Map();
        if (identifier) {
            values['identifier'] = identifier;
        }
        this.generateInteractTelemetry(
            InteractType.TOUCH,
            isNavBack ? InteractSubtype.NAV_BACK_CLICKED : InteractSubtype.DEVICE_BACK_CLICKED,
            env,
            pageId,
            telemetryObject,
            values,
            objRollup,
            corRelationList);
    }

    generatePageViewTelemetry(pageId, env, subType?) {
        this.generateImpressionTelemetry(ImpressionType.VIEW, subType ? subType : '',
            pageId,
            env);
    }

    generateSpineLoadingTelemetry(content: any, isFirstTime) {
        const values = new Map();
        values['isFirstTime'] = isFirstTime;
        values['size'] = content.size;
        const telemetryObject = new TelemetryObject(content.identifier || content.contentId,
            content.contentData ? content.contentData.contentType : content.contentType, content.contentData.pkgVersion);
        this.generateInteractTelemetry(
            InteractType.OTHER,
            InteractSubtype.LOADING_SPINE,
            Environment.HOME,
            PageId.DOWNLOAD_SPINE,
            telemetryObject,
            values,
            ContentUtil.generateRollUp(undefined, telemetryObject.id));
    }

    generateCancelDownloadTelemetry(content: any) {
        const values = new Map();
        const telemetryObject = new TelemetryObject(content.identifier || content.contentId, content.contentType, content.pkgVersion);
        this.generateInteractTelemetry(
            InteractType.TOUCH,
            InteractSubtype.CANCEL_CLICKED,
            Environment.HOME,
            PageId.DOWNLOAD_SPINE,
            telemetryObject,
            values);
    }

    generateDownloadAllClickTelemetry(pageId, content, downloadingIdentifier, childrenCount, rollup?, corelationList?) {
        const values = new Map();
        values['downloadingIdentifers'] = downloadingIdentifier;
        values['childrenCount'] = childrenCount;
        const telemetryObject = new TelemetryObject(content.identifier || content.contentId, content.contentType, content.pkgVersion);
        this.generateInteractTelemetry(
            InteractType.TOUCH,
            InteractSubtype.DOWNLOAD_ALL_CLICKED,
            Environment.HOME,
            pageId,
            telemetryObject,
            values,
            rollup, corelationList);
    }

    generatePullToRefreshTelemetry(pageId, env) {
        this.generateInteractTelemetry(
            InteractType.TOUCH,
            InteractSubtype.PULL_TO_REFRESH,
            env,
            pageId
        );
    }

    /**
     * method generates telemetry on click Read less or Read more
     * @param string param string as read less or read more
     * @param object objRollup object roll up
     * @param corRelationList corelationList
     */
    readLessOrReadMore(param, objRollup, corRelationList, telemetryObject) {
        this.generateInteractTelemetry(InteractType.TOUCH,
            param = 'READ_MORE' === param ? InteractSubtype.READ_MORE_CLICKED : InteractSubtype.READ_LESS_CLICKED,
            Environment.HOME,
            PageId.COLLECTION_DETAIL,
            undefined,
            telemetryObject,
            objRollup,
            corRelationList);
    }

    generateProfilePopulatedTelemetry(pageId, profile, mode, env?, source?) {
        const values = new Map();
        values['board'] = profile.board[0];
        values['medium'] = profile.medium;
        values['grade'] = profile.grade;
        values['mode'] = mode;
        const corRelationList: Array<CorrelationData> = [];
        corRelationList.push({ id: profile.board ? profile.board.join(',') : '', type: CorReleationDataType.BOARD });
        corRelationList.push({ id: profile.medium ? profile.medium.join(',') : '' , type: CorReleationDataType.MEDIUM });
        corRelationList.push({ id: profile.grade ? profile.grade.join(',') : '', type: CorReleationDataType.CLASS });
        corRelationList.push({ id: profile.profileType, type: CorReleationDataType.USERTYPE });
        if (source) {
            corRelationList.push({id: source, type: CorReleationDataType.SOURCE});
        }
        this.generateInteractTelemetry(
            InteractType.OTHER,
            InteractSubtype.PROFILE_ATTRIBUTE_POPULATION,
            env ? env : Environment.HOME,
            pageId,
            undefined,
            values, undefined,
            corRelationList);
    }

    generateAppLaunchTelemetry(type: string, source?: string) {
        const corRelationList: Array<CorrelationData> = [{
            id: ContentUtil.extractBaseUrl(source),
            type: CorReleationDataType.SOURCE
          }];
        this.generateInteractTelemetry(
            type,
            '',
            Environment.HOME,
            Environment.HOME,
            undefined,
            { source },
            undefined,
            corRelationList,
            ID.APP_LAUNCH);
    }

    generateExtraInfoTelemetry(values: Map, pageId) {
        this.generateInteractTelemetry(
            InteractType.OTHER,
            InteractSubtype.EXTRA_INFO,
            Environment.HOME,
            pageId,
            undefined,
            values);
    }

    generateContentCancelClickedTelemetry(content: any, downloadProgress) {
        const values = new Map();
        values['size'] = this.transform(content.size);
        if (content.size && downloadProgress) {
            const kbsofar = (content.size / 100) * Number(downloadProgress);
            values['downloadedSoFar'] = this.transform(kbsofar);
        }
        const telemetryObject = new TelemetryObject(content.identifier || content.contentId, content.contentType, content.pkgVersion);
        this.generateInteractTelemetry(
            InteractType.TOUCH,
            InteractSubtype.CANCEL_CLICKED,
            Environment.HOME,
            PageId.CONTENT_DETAIL,
            telemetryObject,
            values);
    }

    transform(size: any, roundOf: number = 2) {
        if (size || size === 0) {
            if (isNaN(size)) {
                size = 0;
            }
            size /= 1024;
            if (size < 1024) {
                return size.toFixed(roundOf) + ' KB';
            }
            size /= 1024;
            if (size < 1024) {
                return size.toFixed(roundOf) + ' MB';
            }
            size /= 1024;
            if (size < 1024) {
                return size.toFixed(roundOf) + ' GB';
            }
            size /= 1024;
            return size.toFixed(roundOf) + ' TB';
        } else {
            return '0 KB';
        }
    }

    isCollection(mimeType) {
        return mimeType === MimeType.COLLECTION;
    }

    generateUtmInfoTelemetry(values: Map, pageId, object?: TelemetryObject) {
        this.generateInteractTelemetry(
            InteractType.OTHER,
            InteractSubtype.UTM_INFO,
            Environment.HOME,
            pageId,
            object,
            values,
            undefined);
    }

    /* Fast loading telemetry generator */
    generatefastLoadingTelemetry(interactSubtype, pageId, telemetryObject?, objRollup?, value?, corRelationList?) {
        this.generateInteractTelemetry(
            InteractType.OTHER,
            interactSubtype,
            Environment.HOME,
            pageId,
            telemetryObject,
            value,
            objRollup,
            corRelationList
        );
    }

    generateNotificationClickedTelemetry(type, pageId, value?, corRelationList?) {
        this.generateInteractTelemetry(
            type,
            '',
            Environment.HOME,
            pageId,
            undefined,
            value,
            undefined,
            corRelationList
        );
    }


    /* New Telemetry */
    generateBackClickedNewTelemetry(isDeviceBack, env, pageId) {
        this.generateInteractTelemetry(
            InteractType.SELECT_BACK,
            isDeviceBack ? InteractSubtype.DEVICE_BACK_CLICKED : InteractSubtype.UI,
            env,
            pageId
        );
    }

    generatePageLoadedTelemetry(pageId, env, objId?, objType?, objversion?, rollup?, correlationList?) {
        this.generateImpressionTelemetry(
            ImpressionType.PAGE_LOADED, '',
            pageId,
            env,
            correlationList,
            objId,
            objType,
            objversion,
            rollup
        );
    }
}
