"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var slugfy_1 = require("./../utils/slugfy");
var PrismaClient = require("@prisma/client").PrismaClient;
var database = new PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, database.type.createMany({
                            data: [
                                {
                                    name: 'Acampamento, Viagem ou Retiro',
                                    slug: (0, slugfy_1.slugify)('Acampamento, Viagem ou Retiro')
                                },
                                {
                                    name: 'Atração',
                                    slug: (0, slugfy_1.slugify)('Atração')
                                },
                                {
                                    name: 'Aula, Treinamento ou Workshop',
                                    slug: (0, slugfy_1.slugify)('Aula, Treinamento ou Workshop')
                                },
                                {
                                    name: 'Concerto ou Show',
                                    slug: (0, slugfy_1.slugify)('Concerto ou Show')
                                },
                                {
                                    name: 'Conferência',
                                    slug: (0, slugfy_1.slugify)('Conferência')
                                },
                                {
                                    name: 'Convenção',
                                    slug: (0, slugfy_1.slugify)('Convenção')
                                },
                                {
                                    name: 'Excursão',
                                    slug: (0, slugfy_1.slugify)('Excursão')
                                },
                                {
                                    name: 'Feira Profissional ou Exposição',
                                    slug: (0, slugfy_1.slugify)('Feira Profissional ou Exposição')
                                },
                                {
                                    name: 'Festa ou Evento Social',
                                    slug: (0, slugfy_1.slugify)('Festa ou Evento Social')
                                },
                                {
                                    name: 'Festival ou Feira',
                                    slug: (0, slugfy_1.slugify)('Festival ou Feira')
                                },
                                {
                                    name: 'Jogo ou Competição',
                                    slug: (0, slugfy_1.slugify)('Jogo ou Competição')
                                },
                                {
                                    name: 'Outro',
                                    slug: (0, slugfy_1.slugify)('Outro')
                                },
                            ]
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, database.category.createMany({
                            data: [
                                {
                                    name: 'Artes Dramáticas e Visuais',
                                    slug: (0, slugfy_1.slugify)('Artes Dramáticas e Visuais')
                                },
                                {
                                    name: 'Atividades Escolares',
                                    slug: (0, slugfy_1.slugify)('Atividades Escolares')
                                },
                                {
                                    name: 'Caridade e Causas',
                                    slug: (0, slugfy_1.slugify)('Caridade e Causas')
                                },
                                {
                                    name: 'Casa e Estilo de Vida',
                                    slug: (0, slugfy_1.slugify)('Casa e Estilo de Vida')
                                },
                                {
                                    name: 'Ciência e Tecnologia',
                                    slug: (0, slugfy_1.slugify)('Ciência e Tecnologia')
                                },
                                {
                                    name: 'Comidas e/ou Bebidas',
                                    slug: (0, slugfy_1.slugify)('Comidas e Bebidas')
                                },
                                {
                                    name: 'Comunidade e Cultura',
                                    slug: (0, slugfy_1.slugify)('Comunidade e Cultura')
                                },
                                {
                                    name: 'Esportes e Fitness',
                                    slug: (0, slugfy_1.slugify)('Esportes e Fitness')
                                },
                                {
                                    name: 'Familia e Educação',
                                    slug: (0, slugfy_1.slugify)('Familia e Educação')
                                },
                                {
                                    name: 'Feriados e Festas Tradicionais',
                                    slug: (0, slugfy_1.slugify)('Feriados e Festas Tradicionais')
                                },
                                {
                                    name: 'Filmes, Mídia e Entretenimento',
                                    slug: (0, slugfy_1.slugify)('Filmes, Mídia e Entretenimento')
                                },
                                {
                                    name: 'Governo e Político',
                                    slug: (0, slugfy_1.slugify)('Governo e Político')
                                },
                                {
                                    name: 'Moda e Beleza',
                                    slug: (0, slugfy_1.slugify)('Moda e Beleza')
                                },
                                {
                                    name: 'Música',
                                    slug: (0, slugfy_1.slugify)('Música')
                                },
                                {
                                    name: 'Negócios e Profissional',
                                    slug: (0, slugfy_1.slugify)('Negócios e Profissional')
                                },
                                {
                                    name: 'Religião e Espiritualidade',
                                    slug: (0, slugfy_1.slugify)('Religião e Espiritualidade')
                                },
                            ]
                        })];
                case 2:
                    _a.sent();
                    console.log('Success');
                    return [3 /*break*/, 6];
                case 3:
                    error_1 = _a.sent();
                    console.log('Error seeding the database categories and type', error_1);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, database.$disconnect()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
main();
