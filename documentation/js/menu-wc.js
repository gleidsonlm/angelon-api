'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">angelon-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApplicationModule.html" data-type="entity-link" >ApplicationModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-6f741d28794bfce22b7c1939a39d29daf777f0eb4dea40df543473c13c7d9e0efed0d3841e525e3dc732312bcae1079b72d154d44e4111aac4320258331ea014"' : 'data-target="#xs-controllers-links-module-AuthModule-6f741d28794bfce22b7c1939a39d29daf777f0eb4dea40df543473c13c7d9e0efed0d3841e525e3dc732312bcae1079b72d154d44e4111aac4320258331ea014"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-6f741d28794bfce22b7c1939a39d29daf777f0eb4dea40df543473c13c7d9e0efed0d3841e525e3dc732312bcae1079b72d154d44e4111aac4320258331ea014"' :
                                            'id="xs-controllers-links-module-AuthModule-6f741d28794bfce22b7c1939a39d29daf777f0eb4dea40df543473c13c7d9e0efed0d3841e525e3dc732312bcae1079b72d154d44e4111aac4320258331ea014"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-6f741d28794bfce22b7c1939a39d29daf777f0eb4dea40df543473c13c7d9e0efed0d3841e525e3dc732312bcae1079b72d154d44e4111aac4320258331ea014"' : 'data-target="#xs-injectables-links-module-AuthModule-6f741d28794bfce22b7c1939a39d29daf777f0eb4dea40df543473c13c7d9e0efed0d3841e525e3dc732312bcae1079b72d154d44e4111aac4320258331ea014"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-6f741d28794bfce22b7c1939a39d29daf777f0eb4dea40df543473c13c7d9e0efed0d3841e525e3dc732312bcae1079b72d154d44e4111aac4320258331ea014"' :
                                        'id="xs-injectables-links-module-AuthModule-6f741d28794bfce22b7c1939a39d29daf777f0eb4dea40df543473c13c7d9e0efed0d3841e525e3dc732312bcae1079b72d154d44e4111aac4320258331ea014"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DocumentModule.html" data-type="entity-link" >DocumentModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RolesModule.html" data-type="entity-link" >RolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-RolesModule-d94712060f6c8d55feddbd1271a7dd41e290464e693b82701afab510180f9b269fceed4202c1d9f24212e1a2c9cf650c892ac544875fa824b77595a70c14ee16"' : 'data-target="#xs-controllers-links-module-RolesModule-d94712060f6c8d55feddbd1271a7dd41e290464e693b82701afab510180f9b269fceed4202c1d9f24212e1a2c9cf650c892ac544875fa824b77595a70c14ee16"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RolesModule-d94712060f6c8d55feddbd1271a7dd41e290464e693b82701afab510180f9b269fceed4202c1d9f24212e1a2c9cf650c892ac544875fa824b77595a70c14ee16"' :
                                            'id="xs-controllers-links-module-RolesModule-d94712060f6c8d55feddbd1271a7dd41e290464e693b82701afab510180f9b269fceed4202c1d9f24212e1a2c9cf650c892ac544875fa824b77595a70c14ee16"' }>
                                            <li class="link">
                                                <a href="controllers/RolesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RolesModule-d94712060f6c8d55feddbd1271a7dd41e290464e693b82701afab510180f9b269fceed4202c1d9f24212e1a2c9cf650c892ac544875fa824b77595a70c14ee16"' : 'data-target="#xs-injectables-links-module-RolesModule-d94712060f6c8d55feddbd1271a7dd41e290464e693b82701afab510180f9b269fceed4202c1d9f24212e1a2c9cf650c892ac544875fa824b77595a70c14ee16"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RolesModule-d94712060f6c8d55feddbd1271a7dd41e290464e693b82701afab510180f9b269fceed4202c1d9f24212e1a2c9cf650c892ac544875fa824b77595a70c14ee16"' :
                                        'id="xs-injectables-links-module-RolesModule-d94712060f6c8d55feddbd1271a7dd41e290464e693b82701afab510180f9b269fceed4202c1d9f24212e1a2c9cf650c892ac544875fa824b77595a70c14ee16"' }>
                                        <li class="link">
                                            <a href="injectables/RolesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RolesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-c1b9a5d0cab20da19e7a49760546374ebca1296cd9d880f52035d72b8c07f30332431cffa831e7a38087dda2322fa989dec26d7020269ae4bcde2c08a5a3031d"' : 'data-target="#xs-controllers-links-module-UserModule-c1b9a5d0cab20da19e7a49760546374ebca1296cd9d880f52035d72b8c07f30332431cffa831e7a38087dda2322fa989dec26d7020269ae4bcde2c08a5a3031d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-c1b9a5d0cab20da19e7a49760546374ebca1296cd9d880f52035d72b8c07f30332431cffa831e7a38087dda2322fa989dec26d7020269ae4bcde2c08a5a3031d"' :
                                            'id="xs-controllers-links-module-UserModule-c1b9a5d0cab20da19e7a49760546374ebca1296cd9d880f52035d72b8c07f30332431cffa831e7a38087dda2322fa989dec26d7020269ae4bcde2c08a5a3031d"' }>
                                            <li class="link">
                                                <a href="controllers/MeController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-c1b9a5d0cab20da19e7a49760546374ebca1296cd9d880f52035d72b8c07f30332431cffa831e7a38087dda2322fa989dec26d7020269ae4bcde2c08a5a3031d"' : 'data-target="#xs-injectables-links-module-UserModule-c1b9a5d0cab20da19e7a49760546374ebca1296cd9d880f52035d72b8c07f30332431cffa831e7a38087dda2322fa989dec26d7020269ae4bcde2c08a5a3031d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-c1b9a5d0cab20da19e7a49760546374ebca1296cd9d880f52035d72b8c07f30332431cffa831e7a38087dda2322fa989dec26d7020269ae4bcde2c08a5a3031d"' :
                                        'id="xs-injectables-links-module-UserModule-c1b9a5d0cab20da19e7a49760546374ebca1296cd9d880f52035d72b8c07f30332431cffa831e7a38087dda2322fa989dec26d7020269ae4bcde2c08a5a3031d"' }>
                                        <li class="link">
                                            <a href="injectables/JwtAuthGuard.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtAuthGuard</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MeService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRolesDto.html" data-type="entity-link" >UpdateRolesDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/MockGuard.html" data-type="entity-link" >MockGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});