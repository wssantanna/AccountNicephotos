import { browser } from 'protractor';
const AxeBuilder = require('axe-webdriverjs');

// precisa rodar no terminal: ng e2e
function AnalyzeThePage(done) {
    AxeBuilder(browser.driver).analyze(function(results) {
        let reports = {
            'item': []
        }
        let modeloReport = {
            'ordem': '',
            'impacto': '',
            'descricao': '',
            'local': []
        };
        let explicacao = '';

        if (results.violations.length > 0) {

            // ver os detalhes no JSON completo
            console.log(JSON.stringify(results.violations));

            results.violations.forEach((obj, cont) => {
                let report = Object.assign({}, modeloReport);
                report.ordem = (cont + 1);
                report.impacto = obj.impact;
                report.descricao = obj.description;

                obj['nodes'].forEach(summary => {
                    report['local'].push(summary.html);
                });
                reports['item'].push(report);
            });

            reports['item'].forEach(item => {
                explicacao += '\n\nItem: ' + item.ordem + ' -> Impacto: ' + item.impacto + ', ' + item.descricao + '; ' + item['local'].length + ' ocorrências';
                item['local'].forEach(tag => {
                    explicacao += '\nLocal: ' + tag;
                });
                explicacao += '\n\n____________';
            });
        }

        expect(results.violations.length).toBe(0, explicacao);
        done();
    });
}

module.exports.AnalyzeThePage = AnalyzeThePage;
